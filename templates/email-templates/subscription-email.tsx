/**
 * ============================================
 * TEMPLATE: Subscription Renewed Email
 * ============================================
 *
 * Abonelik yenileme bildirimi email template'i (React Email).
 *
 * Özellikler:
 * - ✅ Yenileme bildirimi
 * - ✅ Sonraki fatura tarihi
 * - ✅ Manage subscription link
 *
 * Kurulum: src/email/subscription-renewed.tsx
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
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface SubscriptionRenewedEmailProps {
  userName?: string;
  planName: string;
  amount: string;
  nextBillingDate: string;
  manageLink: string;
}

export const SubscriptionRenewedEmail: React.FC<
  SubscriptionRenewedEmailProps
> = ({
  userName = "Kullanıcı",
  planName,
  amount,
  nextBillingDate,
  manageLink,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Aboneliğiniz Yenilendi</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Aboneliğiniz Yenilendi ✅</Heading>
          <Text style={text}>
            Merhaba {userName},
          </Text>
          <Text style={text}>
            {planName} aboneliğiniz başarıyla yenilendi. Ödeme detaylarınız
            aşağıdadır:
          </Text>

          <Section style={detailsContainer}>
            <div style={detailRow}>
              <Text style={detailLabel}>Plan:</Text>
              <Text style={detailValue}>{planName}</Text>
            </div>
            <div style={detailRow}>
              <Text style={detailLabel}>Tutar:</Text>
              <Text style={detailValue}>{amount}</Text>
            </div>
            <div style={detailRow}>
              <Text style={detailLabel}>Sonraki Fatura Tarihi:</Text>
              <Text style={detailValue}>{nextBillingDate}</Text>
            </div>
          </Section>

          <Section style={buttonContainer}>
            <Button style={button} href={manageLink}>
              Aboneliği Yönet
            </Button>
          </Section>

          <Text style={text}>
            Aboneliğinizi istediğiniz zaman yönetim panelinden
            görüntüleyebilir veya iptal edebilirsiniz.
          </Text>

          <Text style={text}>
            Bizi seçtiğiniz için teşekkür ederiz!
          </Text>

          <Text style={footer}>
            Vibe Starter ekibi
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default SubscriptionRenewedEmail;

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
  color: "#10b981",
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

const detailsContainer = {
  backgroundColor: "#f0fdf4",
  borderRadius: "8px",
  padding: "20px",
  margin: "20px 0",
  border: "1px solid #10b981",
};

const detailRow = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "12px",
};

const detailLabel = {
  fontSize: "14px",
  color: "#047857",
};

const detailValue = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#065f46",
};

const buttonContainer = {
  padding: "27px 0 27px",
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#10b981",
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
