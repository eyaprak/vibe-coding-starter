# API Route Templates - Kullanım Talimatları

API route template'leri (User, Profile, Password, Stripe).

## 📦 İçerik

```
api-route-templates/
├── PROMPT.md                # Bu dosya
├── user-api.ts              # User CRUD API
├── profile-api.ts           # Profile management API
├── password-api.ts          # Password change API
├── stripe-checkout-api.ts   # Stripe checkout API
└── stripe-webhook-api.ts    # Stripe webhook handler
```

## 🚀 Kurulum

```bash
# User API
cp user-api.ts src/app/api/user/route.ts

# Profile API
cp profile-api.ts src/app/api/user/profile/route.ts

# Password API
cp password-api.ts src/app/api/user/password/route.ts

# Stripe Checkout
cp stripe-checkout-api.ts src/app/api/checkout/route.ts

# Stripe Webhook
cp stripe-webhook-api.ts src/app/api/webhooks/stripe/route.ts
```

## ✅ Endpoints

**User API:**
- GET /api/user - Mevcut kullanıcı bilgisi

**Profile API:**
- GET /api/user/profile - Profil bilgileri
- PUT /api/user/profile - Profil güncelleme

**Password API:**
- PUT /api/user/password - Şifre değiştirme

**Stripe Checkout:**
- POST /api/checkout - Checkout session oluştur

**Stripe Webhook:**
- POST /api/webhooks/stripe - Webhook handler

## 🔗 İlişkili Template'ler

- Core Auth Templates
- Database Schema Templates

@see templates/PROMPT.md
