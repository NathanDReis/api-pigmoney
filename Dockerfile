# Imagem base com Node
FROM node:18-alpine AS builder

# Cria diretório da aplicação
WORKDIR /app

# Copia apenas os arquivos de dependências primeiro (melhor cache)
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Compila o projeto (gera /dist)
RUN npm run build

# Segunda etapa — imagem mais leve para rodar a API
FROM node:18-alpine

WORKDIR /app

# Copia apenas o que é necessário para executar
COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

# Expor porta (ajuste conforme seu .env)
EXPOSE 3000

# Comando para iniciar
CMD ["node", "dist/main"]
