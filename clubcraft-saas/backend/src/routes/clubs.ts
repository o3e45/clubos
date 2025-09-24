import { FastifyPluginAsync } from 'fastify';
import { createClubSchema, updateClubSchema, paginationSchema } from '../schemas/club';

const clubsRoutes: FastifyPluginAsync = async (app) => {
  app.get('/', { preHandler: app.authorize(['Viewer']) }, async (request) => {
    const query = paginationSchema.parse(request.query);
    const [data, total] = await Promise.all([
      app.prisma.club.findMany({
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
        orderBy: { createdAt: 'desc' }
      }),
      app.prisma.club.count()
    ]);

    return {
      data,
      meta: {
        page: query.page,
        pageSize: query.pageSize,
        total
      }
    };
  });

  app.post('/', { preHandler: app.authorize(['Treasurer', 'Admin', 'Owner']) }, async (request, reply) => {
    const body = createClubSchema.parse(request.body);
    const club = await app.prisma.club.create({ data: body });
    await app.redis.del('clubs:list');
    return reply.code(201).send(club);
  });

  app.get('/:id', { preHandler: app.authorize(['Viewer']) }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const cacheKey = `club:${id}`;
    const cached = await app.redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const club = await app.prisma.club.findUnique({ where: { id } });
    if (!club) {
      return reply.notFound('Club not found');
    }
    await app.redis.set(cacheKey, JSON.stringify(club), 'EX', 60);
    return club;
  });

  app.put('/:id', { preHandler: app.authorize(['Admin', 'Owner']) }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = updateClubSchema.parse(request.body);
    const club = await app.prisma.club.update({ where: { id }, data: body });
    await app.redis.del(`club:${id}`);
    return reply.send(club);
  });

  app.delete('/:id', { preHandler: app.authorize(['Owner']) }, async (request, reply) => {
    const { id } = request.params as { id: string };
    await app.prisma.club.delete({ where: { id } });
    await app.redis.del(`club:${id}`);
    return reply.code(204).send();
  });
};

export default clubsRoutes;
