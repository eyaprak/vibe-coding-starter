# Database Schema Templates - Kullanım Talimatları

Prisma schema eklemeleri (Subscription, Invoice, AuditLog).

## 📦 İçerik

```
database-schema-templates/
├── PROMPT.md                    # Bu dosya
└── schema-extensions.prisma     # Schema eklemeleri
```

## 🚀 Kurulum

1. `schema-extensions.prisma` dosyasındaki modelleri `prisma/schema.prisma` dosyanıza ekleyin
2. `npm run db:push` çalıştırın
3. `npm run db:generate` ile Prisma client'ı güncelleyin

## ✅ Modeller

**Subscription:**
- Stripe abonelik bilgileri
- Customer, subscription, price ID'leri
- Status ve period tracking

**Invoice:**
- Fatura geçmişi
- Stripe invoice ID'leri
- Amount, currency, status

**AuditLog:**
- Admin işlemleri log'ları
- Action, entity, metadata
- IP address ve user agent

## 🔗 İlişkili Template'ler

- API Route Templates (Stripe APIs)
- Email Templates (Invoice emails)

@see templates/PROMPT.md
