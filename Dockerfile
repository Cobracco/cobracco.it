FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG NEXT_PUBLIC_GA_ID
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID
RUN if [ -z "$NEXT_PUBLIC_GA_ID" ]; then \
      if [ -f .env.production ]; then \
        NEXT_PUBLIC_GA_ID="$(grep -m1 '^NEXT_PUBLIC_GA_ID=' .env.production | cut -d '=' -f2-)" && export NEXT_PUBLIC_GA_ID; \
      fi; \
    fi; \
    if [ -z "$NEXT_PUBLIC_GA_ID" ]; then \
      echo "NEXT_PUBLIC_GA_ID missing (set build-arg or add it to .env.production)"; \
      exit 1; \
    fi; \
    npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]

