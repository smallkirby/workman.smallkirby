FROM node:18-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
RUN npm ci

ENV NEXT_TELEMETRY_DISABLED 1

RUN --mount=type=secret,id=NEXT_PUBLIC_FIREBASE_APIKEY \
  NEXT_PUBLIC_FIREBASE_APIKEY="$(cat /run/secrets/NEXT_PUBLIC_FIREBASE_APIKEY)" \
    npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app ./

USER nextjs

CMD ["npm", "run", "start"]
