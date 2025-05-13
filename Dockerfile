# syntax=docker.io/docker/dockerfile:1

FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Primeiro copiar apenas os arquivos necessários para instalação
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

# Instalar dependências
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci --legacy-peer-deps; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Copiar arquivos do prisma
COPY prisma ./prisma

RUN apk update && apk upgrade
RUN apk add --no-cache openssl

RUN ln -s /usr/lib/libssl.so.3 /lib/libssl.so.3

# Gerar Prisma Client após instalação das dependências
RUN npx prisma generate

# Copiar todos os arquivos do projeto
COPY . .

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV DATABASE_URL=mysql://root:Chris123!@204.216.166.160:3306/traducaodb

RUN apk update && apk upgrade
RUN apk add --no-cache openssl

RUN ln -s /usr/lib/libssl.so.3 /lib/libssl.so.3

# Gerar o Prisma Client
RUN npx prisma generate
RUN npx prisma db push

# Instalar sharp e core-js-pure (necessário para o Next.js)
RUN npm i sharp core-js-pure --legacy-peer-deps

# Construir o projeto
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN apk update && apk upgrade
RUN apk add --no-cache openssl

RUN ln -s /usr/lib/libssl.so.3 /lib/libssl.so.3

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]