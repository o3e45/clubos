import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { stripeService } from '../services/stripeService';

const subscribeSchema = z.object({
  customerId: z.string(),
  priceId: z.string(),
  paymentMethodId: z.string()
});

const billingRoutes: FastifyPluginAsync = async (app) => {
  app.post('/subscribe', { preHandler: app.authorize(['Admin', 'Owner']) }, async (request, reply) => {
    const body = subscribeSchema.parse(request.body);
    const subscription = await stripeService.createSubscription(body);
    return reply.send(subscription);
  });
};

export default billingRoutes;
