/**
 * ============================================
 * TEMPLATE: Invoice Email
 * ============================================
 *
 * Fatura bildirimi email template'i (React Email).
 *
 * Özellikler:
 * - ✅ Fatura detayları
 * - ✅ Download PDF link
 * - ✅ Payment method
 *
 * Kurulum: src/email/invoice.tsx
 *
 * @see templates/email-templates/PROMPT.md
 * ============================================
 */

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface InvoiceEmailProps {
  userName?: string;
  invoiceNumber: string;
  amount: string;
  dueDate: string;
  invoiceLink: string;
}

export const InvoiceEmail: React.FC<InvoiceEmailProps> = ({
  userName = "Kullanıcı",
  invoiceNumber,
  amount,
  dueDate,
  invoiceLink,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Fatura Bildirimi - {invoiceNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Yeni Faturanız Hazır</Heading>
          <Text style={text}>
            Merhaba {userName},
          </Text>
          <Text style={text}>
            {invoiceNumber} numaralı faturanız hazırdır. Fatura detayları
            aşağıda yer almaktadır:
          </Text>

          <Section style={invoiceContainer}>
            <div style={invoiceRow}>
              <Text style={invoiceLabel}>Fatura No:</Text>
              <Text style={invoiceValue}>{invoiceNumber}</Text>
            </div>
            <div style={invoiceRow}>
              <Text style={invoiceLabel}>Tutar:</Text>
              <Text style={invoiceValue}>{amount}</Text>
            </div>
            <div style={invoiceRow}>
              <Text style={invoiceLabel}>Vade Tarihi:</Text>
              <Text style={invoiceValue}>{dueDate}</Text>
            </div>
          </Section>

          <Section style={buttonContainer}>
            <Button style={button} href={invoiceLink}>
              Faturayı İndir (PDF)
            </Button>
          </Section>

          <Text style={text}>
            Faturanız başarıyla ödenmiştir. Ödeme detaylarınızı dashboard'ınızda
            görüntüleyebilirsiniz.
          </Text>

          <Text style={text}>
            Herhangi bir sorunuz için bize ulaşmaktan çekinmeyin.
          </Text>

          <Text style={footer}>
            Vibe Starter ekibi
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default InvoiceEmail;

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
  textAlign: "center" as const,
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  textAlign: "left" as const,
  display: "block",
};

const invoiceContainer = {
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
  padding: "20px",
  margin: "20px 0",
};

const invoiceRow = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "12px",
};

const invoiceLabel = {
  fontSize: "14px",
  color: "#6b7280",
};

const invoiceValue = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#111827",
};

const buttonContainer = {
  padding: "27px 0 27px",
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5469d4",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px 40px",
};

const footer = {
  color: "#8898aa",
  fontSize: "14px",
  lineHeight: "24px",
  marginTop: "12px",
};
