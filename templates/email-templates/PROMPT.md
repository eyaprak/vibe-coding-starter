# Email Templates - Kullanım Talimatları

React Email template'leri (Welcome, Reset, Invoice, Subscription).

## 📦 İçerik

```
email-templates/
├── PROMPT.md                    # Bu dosya
├── welcome-email.tsx            # Hoş geldin email'i
├── reset-password-email.tsx     # Password reset email'i
├── invoice-email.tsx            # Fatura bildirimi
└── subscription-email.tsx       # Abonelik yenileme bildirimi
```

## 🚀 Kurulum

```bash
# Email klasörü oluştur
mkdir -p src/email

# Template'leri kopyala
cp welcome-email.tsx src/email/welcome.tsx
cp reset-password-email.tsx src/email/reset-password.tsx
cp invoice-email.tsx src/email/invoice.tsx
cp subscription-email.tsx src/email/subscription-renewed.tsx
```

## ✅ Template'ler

**Welcome Email:**
- User name ile hoş geldin
- Quick start linkleri
- Branding

**Reset Password:**
- Reset link
- Güvenlik uyarısı
- Link expiration

**Invoice Email:**
- Fatura detayları
- Download PDF link
- Payment method

**Subscription Renewed:**
- Yenileme bildirimi
- Sonraki fatura tarihi
- Manage subscription link

## 📧 Gönderim

Resend API kullanarak:

```typescript
import { Resend } from 'resend';
import { WelcomeEmail } from '@/email/welcome';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'noreply@yourdomain.com',
  to: user.email,
  subject: 'Hoş Geldiniz!',
  react: <WelcomeEmail userName={user.name} />,
});
```

## 🔗 İlişkili Template'ler

- API Route Templates (Send Email API)
- Utility Hook Templates (Email helper)

@see templates/PROMPT.md
