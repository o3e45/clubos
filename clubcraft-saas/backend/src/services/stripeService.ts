import Stripe from 'stripe';
import { env } from '../env';

const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

export const STRIPE_PRICING = {
  Starter: 'price_starter',
  Growth: 'price_growth',
  Pro: 'price_pro'
} as const;

export const stripeService = {
  async createSubscription({ customerId, priceId, paymentMethodId }: { customerId: string; priceId: string; paymentMethodId: string }) {
    await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });
    await stripe.customers.update(customerId, { invoice_settings: { default_payment_method: paymentMethodId } });

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      expand: ['latest_invoice.payment_intent']
    });

    return {
      subscriptionId: subscription.id,
      status: subscription.status
    };
  },
  constructWebhookEvent(payload: string | Buffer, signature: string | string[], secret: string) {
    return stripe.webhooks.constructEvent(payload, signature, secret);
  }
};
