import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifySensible from '@fastify/sensible';
import fastifyJwt from '@fastify/jwt';
import { env } from './env';
import { prismaPlugin } from './plugins/prisma';
import { redisPlugin } from './plugins/redis';
import { authPlugin } from './plugins/auth';
import clubsRoutes from './routes/clubs';
import authRoutes from './routes/auth';
import billingRoutes from './routes/billing';
import webhookRoutes from './routes/webhooks';

export async function createApp() {
  const app = Fastify({
    logger: true
  });

  await app.register(fastifyHelmet, { contentSecurityPolicy: false });
  await app.register(fastifyCors, { origin: true, credentials: true });
  await app.register(fastifySensible);
  await app.register(prismaPlugin);
  await app.register(redisPlugin);
  await app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: { expiresIn: env.JWT_EXPIRES_IN }
  });
  await app.register(authPlugin);

  await app.register(authRoutes, { prefix: '/auth' });
  await app.register(clubsRoutes, { prefix: '/clubs' });
  await app.register(billingRoutes, { prefix: '/billing' });
  await app.register(webhookRoutes, { prefix: '/webhooks' });

  app.get('/health', async () => ({ status: 'ok' }));

  return app;
}
