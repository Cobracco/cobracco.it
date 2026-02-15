FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_GOOGLE_ADS_ID
ARG NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL
ARG NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_CONTACT
ARG NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_CANDIDATURA
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID
ENV NEXT_PUBLIC_GOOGLE_ADS_ID=$NEXT_PUBLIC_GOOGLE_ADS_ID
ENV NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=$NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL
ENV NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_CONTACT=$NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_CONTACT
ENV NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_CANDIDATURA=$NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_CANDIDATURA
RUN if [ -z "$NEXT_PUBLIC_GA_ID" ]; then \
      if [ -f .env.production ]; then \
        NEXT_PUBLIC_GA_ID="$(grep -m1 '^NEXT_PUBLIC_GA_ID=' .env.production | cut -d '=' -f2-)" && export NEXT_PUBLIC_GA_ID; \
      fi; \
    fi; \
    if [ -z "$NEXT_PUBLIC_GA_ID" ]; then \
      echo "NEXT_PUBLIC_GA_ID missing (set build-arg or add it to .env.production)"; \
      exit 1; \
    fi; \
    if [ -z "$NEXT_PUBLIC_GOOGLE_ADS_ID" ] && [ -f .env.production ]; then \
      NEXT_PUBLIC_GOOGLE_ADS_ID="$(grep -m1 '^NEXT_PUBLIC_GOOGLE_ADS_ID=' .env.production | cut -d '=' -f2-)" && export NEXT_PUBLIC_GOOGLE_ADS_ID; \
    fi; \
    if [ -z "$NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL" ] && [ -f .env.production ]; then \
      NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL="$(grep -m1 '^NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=' .env.production | cut -d '=' -f2-)" && export NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL; \
    fi; \
    if [ -z "$NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_CONTACT" ] && [ -f .env.production ]; then \
      NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_CONTACT="$(grep -m1 '^NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_CONTACT=' .env.production | cut -d '=' -f2-)" && export NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_CONTACT; \
    fi; \
    if [ -z "$NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_CANDIDATURA" ] && [ -f .env.production ]; then \
      NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_CANDIDATURA="$(grep -m1 '^NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_CANDIDATURA=' .env.production | cut -d '=' -f2-)" && export NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_CANDIDATURA; \
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

