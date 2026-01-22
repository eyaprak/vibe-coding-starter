# Utility & Hook Templates - Kullanım Talimatları

Utility fonksiyonları ve custom React hooks.

## 📦 İçerik

```
utility-hook-templates/
├── PROMPT.md                # Bu dosya
├── validation.ts            # Zod validation schemas
├── stripe.ts                # Stripe helper functions
├── email.ts                 # Email helper functions
├── use-auth.ts              # useAuth hook
├── use-user.ts              # useUser hook
└── use-form.ts              # useForm hook
```

## 🚀 Kurulum

```bash
# Utility klasörü yoksa oluştur
# src/lib zaten var

cp validation.ts src/lib/validation.ts
cp stripe.ts src/lib/stripe.ts
cp email.ts src/lib/email.ts

# Hooks
cp use-auth.ts src/hooks/use-auth.ts
cp use-user.ts src/hooks/use-user.ts
cp use-form.ts src/hooks/use-form.ts
```

## ✅ Utilities

**validation.ts:**
- registerSchema
- loginSchema
- profileSchema
- passwordSchema
- settingsSchema

**stripe.ts:**
- Stripe client initialization
- createCheckoutSession()
- createCustomer()
- cancelSubscription()

**email.ts:**
- Resend client
- sendEmail() function
- Template renderer

## ✅ Hooks

**useAuth:**
- Auth state management
- Session, loading, error

**useUser:**
- Kullanıcı verisi fetching
- Mutations (update, delete)

**useForm:**
- Form handling wrapper
- react-hook-form + Zod

## 🔗 İlişkili Template'ler

- Core Auth Templates
- API Route Templates
- Email Templates

@see templates/PROMPT.md
