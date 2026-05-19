FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies (including dev for build)
COPY package.json package-lock.json* ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production

# Copy package.json and built artifacts
COPY package.json package-lock.json* ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 5000
CMD ["node", "dist/server.js"]
