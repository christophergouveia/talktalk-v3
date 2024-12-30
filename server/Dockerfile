FROM node:18-alpine

WORKDIR /app

# Instalar dependências necessárias incluindo OpenSSL
RUN apk add --no-cache libc6-compat openssl openssl-dev

# Copiar arquivos do projeto
COPY package*.json ./
COPY ../prisma ./prisma/

# Instalar dependências
RUN npm install

# Gerar Prisma Client
RUN npx prisma generate

# Copiar o resto dos arquivos
COPY . .

# Expor a porta que o servidor usa
EXPOSE 3001

# Variáveis de ambiente
ENV NODE_ENV=production
ENV DATABASE_URL=mysql://root:123123@204.216.166.160:3306/traducaodb

# Executar migrações e iniciar o servidor
CMD npm run migrate:deploy && npm start 