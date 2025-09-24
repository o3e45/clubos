import fp from 'fastify-plugin';
import { FastifyReply, FastifyRequest } from 'fastify';
import { canAccess, Role } from '../domain/rbac';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { userId: string; role: Role };
    user: { userId: string; role: Role };
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    authorize: (roles?: Role[]) => (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

export const authPlugin = fp(async (app) => {
  app.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      return reply.unauthorized();
    }
  });

  app.decorate('authorize', (roles: Role[] = []) => {
    return async (request: FastifyRequest, reply: FastifyReply) => {
      const authResult = await app.authenticate(request, reply);
      if (authResult) {
        return authResult;
      }
      const userRole = request.user?.role ?? 'Viewer';
      if (!canAccess(userRole, roles)) {
        return reply.forbidden();
      }
    };
  });
});
