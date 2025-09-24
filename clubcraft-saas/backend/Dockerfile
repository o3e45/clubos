FROM node:20-alpine AS base
WORKDIR /app
COPY package.json pnpm-lock.yaml* tsconfig.json tsup.config.ts jest.config.ts ./
COPY prisma ./prisma
RUN corepack enable && pnpm install --prod=false
COPY src ./src
RUN pnpm build

FROM node:20-alpine
WORKDIR /app
COPY --from=base /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules
COPY package.json ./package.json
CMD ["node", "dist/index.js"]
