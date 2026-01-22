# Dashboard Page Templates - Kullanım Talimatları

Dashboard sayfa template'leri (Home, Profile, Settings, Billing, Admin).

## 📦 İçerik

```
dashboard-page-templates/
├── PROMPT.md                # Bu dosya
├── dashboard-home.tsx       # Dashboard ana sayfa
├── profile-page.tsx         # Profil sayfası
├── settings-page.tsx        # Ayarlar sayfası
├── billing-page.tsx         # Faturalandırma sayfası
└── admin-page.tsx           # Admin paneli sayfası
```

## 🚀 Kurulum

Her sayfa için:
```bash
# Dashboard home
cp dashboard-home.tsx src/app/(dashboard)/page.tsx

# Profile
cp profile-page.tsx src/app/(dashboard)/profile/page.tsx

# Settings
cp settings-page.tsx src/app/(dashboard)/settings/page.tsx

# Billing
cp billing-page.tsx src/app/(dashboard)/billing/page.tsx

# Admin
cp admin-page.tsx src/app/(dashboard)/admin/page.tsx
```

## ✅ Özellikler

**Dashboard Home:**
- Hoş geldin mesajı
- StatCard'lar (istatistikler)
- Quick actions
- Son aktiviteler

**Profile:**
- Kullanıcı bilgileri card
- Düzenleme formu
- Avatar upload

**Settings:**
- Tabs (Hesap, Güvenlik, Bildirimler)
- Email değiştirme
- Password değiştirme

**Billing:**
- Mevcut plan card
- Fatura geçmişi
- Stripe entegrasyonu

**Admin:**
- Kullanıcı listesi (DataTable)
- Filtreleme ve arama
- Bulk actions

## 🔗 İlişkili Template'ler

- Dashboard Layout Templates
- UI Component Templates (StatCard, DataTable)
- API Route Templates

@see templates/PROMPT.md
