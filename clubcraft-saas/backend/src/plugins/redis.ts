import fp from 'fastify-plugin';
import Redis from 'ioredis';
import { env } from '../env';

declare module 'fastify' {
  interface FastifyInstance {
    redis: Pick<Redis, 'get' | 'set' | 'del' | 'quit'>;
  }
}

class MemoryRedis {
  private store = new Map<string, string>();

  async get(key: string) {
    return this.store.get(key) ?? null;
  }

  async set(key: string, value: string, mode?: string, duration?: number) {
    this.store.set(key, value);
    if (mode === 'EX' && duration) {
      setTimeout(() => this.store.delete(key), duration * 1000).unref?.();
    }
    return 'OK';
  }

  async del(key: string) {
    this.store.delete(key);
    return 1;
  }

  async quit() {
    this.store.clear();
  }
}

type RedisLike = Pick<Redis, 'get' | 'set' | 'del' | 'quit'> | MemoryRedis;

export const redisPlugin = fp(async (app) => {
  const client: RedisLike = env.NODE_ENV === 'test' ? new MemoryRedis() : new Redis(env.REDIS_URL);
  app.decorate('redis', client);

  app.addHook('onClose', async () => {
    await client.quit();
  });
});
