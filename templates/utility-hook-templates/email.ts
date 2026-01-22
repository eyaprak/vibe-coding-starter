/**
 * ============================================
 * TEMPLATE: Email Utility
 * ============================================
 *
 * Email gönderme helper fonksiyonları template'i.
 *
 * Özellikler:
 * - ✅ Resend client initialization
 * - ✅ sendEmail() function
 * - ✅ Template renderer
 *
 * Kurulum: src/lib/email.ts
 *
 * Environment Variables:
 * - RESEND_API_KEY
 * - NEXTAUTH_URL (base URL)
 *
 * @see templates/utility-hook-templates/PROMPT.md
 * ============================================
 */

import { Resend } from "resend";
import { ReactElement } from "react";

export const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Email gönderir.
 */
export async function sendEmail(params: {
  to: string | string[];
  subject: string;
  react: ReactElement;
  from?: string;
}) {
  const { to, subject, react, from } = params;

  try {
    const { data, error } = await resend.emails.send({
      from: from || "Vibe Starter <noreply@yourdomain.com>",
      to,
      subject,
      react,
    });

    if (error) {
      console.error("Email send error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}

/**
 * Hoş geldin email'i gönderir.
 */
export async function sendWelcomeEmail(params: {
  to: string;
  userName?: string;
}) {
  // Email template'ini import et
  // const { WelcomeEmail } = await import("@/email/welcome");

  // TODO: WelcomeEmail component'ini ekledikten sonra comment'i kaldır
  return sendEmail({
    to: params.to,
    subject: "Vibe Starter'a Hoş Geldiniz!",
    react: null as any, // WelcomeEmail({ userName: params.userName })
  });
}

/**
 * Şifre sıfırlama email'i gönderir.
 */
export async function sendResetPasswordEmail(params: {
  to: string;
  userName?: string;
  resetLink: string;
}) {
  // TODO: ResetPasswordEmail component'ini ekledikten sonra comment'i kaldır
  return sendEmail({
    to: params.to,
    subject: "Şifre Sıfırlama Talebi",
    react: null as any,
  });
}

/**
 * Fatura email'i gönderir.
 */
export async function sendInvoiceEmail(params: {
  to: string;
  userName?: string;
  invoiceNumber: string;
  amount: string;
  dueDate: string;
  invoiceLink: string;
}) {
  // TODO: InvoiceEmail component'ini ekledikten sonra comment'i kaldır
  return sendEmail({
    to: params.to,
    subject: `Fatura Bildirimi - ${params.invoiceNumber}`,
    react: null as any,
  });
}

/**
 * Abonelik yenileme email'i gönderir.
 */
export async function sendSubscriptionRenewedEmail(params: {
  to: string;
  userName?: string;
  planName: string;
  amount: string;
  nextBillingDate: string;
  manageLink: string;
}) {
  // TODO: SubscriptionRenewedEmail component'ini ekledikten sonra comment'i kaldır
  return sendEmail({
    to: params.to,
    subject: "Aboneliğiniz Yenilendi",
    react: null as any,
  });
}
