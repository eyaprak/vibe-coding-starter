/**
 * ============================================
 * TEMPLATE: Stripe Utility
 * ============================================
 *
 * Stripe helper fonksiyonları template'i.
 *
 * Özellikler:
 * - ✅ Stripe client initialization
 * - ✅ createCheckoutSession()
 * - ✅ createCustomer()
 * - ✅ cancelSubscription()
 *
 * Kurulum: src/lib/stripe.ts
 *
 * Environment Variables:
 * - STRIPE_SECRET_KEY
 * - STRIPE_WEBHOOK_SECRET
 *
 * @see templates/utility-hook-templates/PROMPT.md
 * ============================================
 */

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
  typescript: true,
});

/**
 * Checkout session oluşturur.
 */
export async function createCheckoutSession(params: {
  customerId: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}) {
  const { customerId, priceId, successUrl, cancelUrl, metadata } = params;

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
  });

  return session;
}

/**
 * Yeni Stripe müşterisi oluşturur.
 */
export async function createCustomer(params: {
  email: string;
  name?: string;
  metadata?: Record<string, string>;
}) {
  const { email, name, metadata } = params;

  const customer = await stripe.customers.create({
    email,
    name,
    metadata,
  });

  return customer;
}

/**
 * Aboneliği iptal eder.
 */
export async function cancelSubscription(subscriptionId: string) {
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });

  return subscription;
}

/**
 * Aboneliği hemen iptal eder.
 */
export async function cancelSubscriptionImmediately(subscriptionId: string) {
  const subscription = await stripe.subscriptions.cancel(subscriptionId);

  return subscription;
}

/**
 * Fatura PDF URL'ini döndürür.
 */
export async function getInvoicePdfUrl(invoiceId: string) {
  const invoice = await stripe.invoices.retrieve(invoiceId);

  return invoice.invoice_pdf;
}
