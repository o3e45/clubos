import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';
import { env } from '../env';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const prisma = new PrismaClient();

export const prismaPlugin = fp(async (app) => {
  if (env.NODE_ENV !== 'test') {
    await prisma.$connect();
  }
  app.decorate('prisma', prisma);

  app.addHook('onClose', async () => {
    if (env.NODE_ENV !== 'test') {
      await prisma.$disconnect();
    }
  });
});
