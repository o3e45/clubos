import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';

const authRoutes: FastifyPluginAsync = async (app) => {
  app.post('/login', async (request, reply) => {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6)
    });

    const body = bodySchema.parse(request.body);

    // TODO: Replace with real password verification
    const user = {
      id: 'user-1',
      email: body.email,
      role: 'Owner' as const
    };

    const token = app.jwt.sign({ userId: user.id, role: user.role });

    return reply.send({ token, user });
  });
};

export default authRoutes;
