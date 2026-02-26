#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
CONFIG_FILE="${ROOT_DIR}/.deploy/deploy.env"

DEPLOY_COMPOSE_FILE=""
DEPLOY_ENV_FILE=""
DEPLOY_ENABLE_BUILD="true"
DEPLOY_REQUIRE_PROXY_NETWORK="true"
DEPLOY_PROFILE=""
DEPLOY_HEALTHCHECK_URL=""
DEPLOY_HEALTHCHECK_ATTEMPTS="30"
DEPLOY_HEALTHCHECK_INTERVAL_SECONDS="2"
DEPLOY_REQUIRED_FILES=""

if [[ -f "${CONFIG_FILE}" ]]; then
  # shellcheck disable=SC1090
  source "${CONFIG_FILE}"
fi

OVERRIDE_COMPOSE=""
OVERRIDE_ENV=""
OVERRIDE_PROFILE=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --no-build)
      DEPLOY_ENABLE_BUILD="false"
      shift
      ;;
    --profile)
      OVERRIDE_PROFILE="${2:-}"
      shift 2
      ;;
    --compose-file)
      OVERRIDE_COMPOSE="${2:-}"
      shift 2
      ;;
    --env-file)
      OVERRIDE_ENV="${2:-}"
      shift 2
      ;;
    *)
      echo "Unknown argument: $1"
      echo "Usage: bash scripts/deploy/ubuntu/release.sh [--no-build] [--profile <name>] [--compose-file <path>] [--env-file <path>]"
      exit 1
      ;;
  esac
done

resolve_first_existing_file() {
  for rel in "$@"; do
    if [[ -f "${ROOT_DIR}/${rel}" ]]; then
      echo "$rel"
      return 0
    fi
  done
  return 1
}

if [[ -n "${OVERRIDE_COMPOSE}" ]]; then
  DEPLOY_COMPOSE_FILE="${OVERRIDE_COMPOSE}"
fi
if [[ -n "${OVERRIDE_ENV}" ]]; then
  DEPLOY_ENV_FILE="${OVERRIDE_ENV}"
fi
if [[ -n "${OVERRIDE_PROFILE}" ]]; then
  DEPLOY_PROFILE="${OVERRIDE_PROFILE}"
fi

if [[ -z "${DEPLOY_COMPOSE_FILE}" ]]; then
  DEPLOY_COMPOSE_FILE="$(resolve_first_existing_file "infra/docker-compose.ubuntu.yml" "docker-compose.prod.yml" "docker-compose.yml")" || {
    echo "No compose file found. Set DEPLOY_COMPOSE_FILE in ${CONFIG_FILE}."
    exit 1
  }
fi

if [[ -z "${DEPLOY_ENV_FILE}" ]]; then
  DEPLOY_ENV_FILE="$(resolve_first_existing_file ".env.production" ".env.prod" ".env.docker" ".env")" || {
    echo "No env file found. Set DEPLOY_ENV_FILE in ${CONFIG_FILE}."
    exit 1
  }
fi

if [[ ! -f "${ROOT_DIR}/${DEPLOY_COMPOSE_FILE}" ]]; then
  echo "Missing compose file: ${ROOT_DIR}/${DEPLOY_COMPOSE_FILE}"
  exit 1
fi

if [[ ! -f "${ROOT_DIR}/${DEPLOY_ENV_FILE}" ]]; then
  echo "Missing env file: ${ROOT_DIR}/${DEPLOY_ENV_FILE}"
  exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker not installed."
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "Docker Compose plugin not available."
  exit 1
fi

cd "${ROOT_DIR}"

if [[ "${DEPLOY_REQUIRE_PROXY_NETWORK}" == "true" ]] && ! docker network inspect proxy >/dev/null 2>&1; then
  echo "Creating external docker network: proxy"
  docker network create proxy
fi

if [[ -n "${DEPLOY_REQUIRED_FILES}" ]]; then
  for required in ${DEPLOY_REQUIRED_FILES}; do
    if [[ ! -f "${ROOT_DIR}/${required}" ]]; then
      echo "Missing required file: ${ROOT_DIR}/${required}"
      exit 1
    fi
  done
fi

COMPOSE_ARGS=(--env-file "${ROOT_DIR}/${DEPLOY_ENV_FILE}" -f "${ROOT_DIR}/${DEPLOY_COMPOSE_FILE}")
if [[ -n "${DEPLOY_PROFILE}" ]]; then
  COMPOSE_ARGS+=(--profile "${DEPLOY_PROFILE}")
fi

if [[ -z "${DEPLOY_PROFILE}" ]] && grep -Eq '^DB_HOST=sqlserver([[:space:]]*)$' "${ROOT_DIR}/${DEPLOY_ENV_FILE}"; then
  echo "Warning: DB_HOST=sqlserver but no profile is set."
  echo "If you rely on local SQL container, rerun with: --profile local-infra"
fi

echo "Validating compose..."
docker compose "${COMPOSE_ARGS[@]}" config >/dev/null

if [[ "${DEPLOY_ENABLE_BUILD}" == "true" ]]; then
  echo "Building images..."
  docker compose "${COMPOSE_ARGS[@]}" build --pull
fi

echo "Starting services..."
if ! docker compose "${COMPOSE_ARGS[@]}" up -d; then
  echo "Compose up failed. Recent status:"
  docker compose "${COMPOSE_ARGS[@]}" ps || true
  echo "Recent logs:"
  docker compose "${COMPOSE_ARGS[@]}" logs --tail 150 || true
  exit 1
fi

if [[ -n "${DEPLOY_HEALTHCHECK_URL}" ]]; then
  echo "Waiting for health endpoint: ${DEPLOY_HEALTHCHECK_URL}"
  for ((i = 1; i <= DEPLOY_HEALTHCHECK_ATTEMPTS; i++)); do
    if curl -fsS "${DEPLOY_HEALTHCHECK_URL}" >/dev/null 2>&1; then
      echo "Health endpoint is ready."
      break
    fi
    if [[ "${i}" -eq "${DEPLOY_HEALTHCHECK_ATTEMPTS}" ]]; then
      echo "Health endpoint not ready after ${DEPLOY_HEALTHCHECK_ATTEMPTS} attempts."
      exit 1
    fi
    sleep "${DEPLOY_HEALTHCHECK_INTERVAL_SECONDS}"
  done
fi

echo "Service status:"
docker compose "${COMPOSE_ARGS[@]}" ps

echo "Deploy completed using:"
echo "  compose: ${DEPLOY_COMPOSE_FILE}"
echo "  env: ${DEPLOY_ENV_FILE}"
