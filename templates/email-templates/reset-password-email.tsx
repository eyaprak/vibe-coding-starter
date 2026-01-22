/**
 * ============================================
 * TEMPLATE: Reset Password Email
 * ============================================
 *
 * Şifre sıfırlama email template'i (React Email).
 *
 * Özellikler:
 * - ✅ Reset link
 * - ✅ Güvenlik uyarısı
 * - ✅ Link expiration
 *
 * Kurulum: src/email/reset-password.tsx
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

interface ResetPasswordEmailProps {
  userName?: string;
  resetLink: string;
}

export const ResetPasswordEmail: React.FC<ResetPasswordEmailProps> = ({
  userName = "Kullanıcı",
  resetLink,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Şifre Sıfırlama Talebi</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Şifrenizi Sıfırlayın</Heading>
          <Text style={text}>
            Merhaba {userName},
          </Text>
          <Text style={text}>
            Hesabınız için bir şifre sıfırlama talebi aldık. Şifrenizi sıfırlamak
            için aşağıdaki butona tıklayın:
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={resetLink}>
              Şifreyi Sıfırla
            </Button>
          </Section>

          <Text style={warning}>
            ⚠️ Güvenlik Uyarısı: Bu talebi siz yapmadıysanız, lütfen bu
            email'i görmezden gelin ve şifrenizi değiştirmeyin.
          </Text>

          <Text style={text}>
            Bu link 1 saat geçerlidir. Süre dolduktan sonra yeni bir sıfırlama
            talebinde bulunmanız gerekecektir.
          </Text>

          <Text style={footer}>
            Vibe Starter ekibi olarak size yardımcı olmaktan mutluluk duyarız.
            Herhangi bir sorunuz için bize ulaşın.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ResetPasswordEmail;

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
  backgroundColor: "#dc2626",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px 40px",
};

const warning = {
  color: "#dc2626",
  fontSize: "14px",
  lineHeight: "24px",
  marginTop: "20px",
  padding: "12px",
  backgroundColor: "#fef2f2",
  borderRadius: "8px",
};

const footer = {
  color: "#8898aa",
  fontSize: "14px",
  lineHeight: "24px",
  marginTop: "12px",
};
