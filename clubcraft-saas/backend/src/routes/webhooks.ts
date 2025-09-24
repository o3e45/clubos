import { FastifyPluginAsync } from 'fastify';
import Stripe from 'stripe';
import { env } from '../env';
import { stripeService } from '../services/stripeService';

const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

const webhookRoutes: FastifyPluginAsync = async (app) => {
  app.post('/stripe', async (request, reply) => {
    const signature = request.headers['stripe-signature'];
    const payload = typeof request.body === 'string' ? request.body : JSON.stringify(request.body ?? {});

    if (!signature || !webhookSecret) {
      request.log.warn('Missing Stripe signature or webhook secret.');
      return reply.code(400).send({ error: 'Invalid webhook configuration' });
    }

    let event: Stripe.Event;
    try {
      event = stripeService.constructWebhookEvent(payload, signature, webhookSecret);
    } catch (error) {
      request.log.error(error);
      return reply.code(400).send({ error: 'Webhook signature verification failed' });
    }

    request.log.info({ type: event.type }, 'Received Stripe event');
    return reply.code(200).send({ received: true });
  });
};

export default webhookRoutes;
