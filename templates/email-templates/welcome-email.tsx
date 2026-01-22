/**
 * ============================================
 * TEMPLATE: Welcome Email
 * ============================================
 *
 * Hoş geldin email template'i (React Email).
 *
 * Özellikler:
 * - ✅ User name ile kişiselleştirme
 * - ✅ Quick start linkleri
 * - ✅ Responsive design
 *
 * Kurulum: src/email/welcome.tsx
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

interface WelcomeEmailProps {
  userName?: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ userName = "Kullanıcı" }) => {
  return (
    <Html>
      <Head />
      <Preview>Vibe Starter'a Hoş Geldiniz!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Hoş Geldiniz, {userName}! 👋</Heading>
          <Text style={text}>
            Vibe Starter'a hoş geldiniz! Hesabınız başarıyla oluşturuldu.
          </Text>

          <Text style={text}>Hızlı başlangıç için:</Text>

          <Section style={buttonContainer}>
            <Button style={button} href="/dashboard">
              Dashboard'a Git
            </Button>
          </Section>

          <Text style={text}>
            Veya şu linkleri kullanabilirsiniz:
          </Text>

          <ul style={list}>
            <li style={listItem}>
              <Link href="/dashboard/profile">Profilinizi düzenleyin</Link>
            </li>
            <li style={listItem}>
              <Link href="/dashboard/settings">Ayarlarınızı yapılandırın</Link>
            </li>
            <li style={listItem}>
              <Link href="/dashboard/billing">Abonelik planınızı seçin</Link>
            </li>
          </ul>

          <Text style={footer}>
            Vibe Starter ekibi olarak size yardımcı olmaktan mutluluk duyarız.
            Herhangi bir sorunuz için bize ulaşın.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;

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

const list = {
  margin: "20px 0",
  paddingLeft: "20px",
};

const listItem = {
  margin: "10px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "14px",
  lineHeight: "24px",
  marginTop: "12px",
};
