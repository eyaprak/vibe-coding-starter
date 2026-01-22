# Vibe Coding Starter - Template Sistemi

Bu PROMPT.md dosyası, AI agentların **Vibe Coding Starter** template sistemini tam olarak anlamasını ve kullanmasını sağlar.

## 🎯 Sistem Nedir?

**Vibe Coding Starter**, kullanıcıların fork'layıp hemen kullanabileceği hazır bir **SaaS/Admin Panel starter template** paketidir.

### Template'in Amacı

Kullanıcıların:
- ✅ Sıfırdan başlamaması için hazır şablonlar sunar
- ✅ Modern best practice'leri öğrenip uygulayabilir
- ✅ Hızlıca MVP/SaaS/Admin Panel geliştirebilir
- ✅ Production-ready kodlarla başlayabilir

## 📁 Template Klasör Yapısı

```
templates/
├── PROMPT.md                                    # Bu dosya - Ana sistem rehberi
│
├── core-auth-templates/                        # Core Authentication Template'leri
│   ├── PROMPT.md                               # Core auth kullanım talimatları
│   ├── middleware.ts                           # NextAuth middleware
│   ├── login-page.tsx                          # Login sayfası
│   ├── register-page.tsx                       # Register sayfası
│   └── register-api.ts                         # Register API route
│
├── dashboard-layout-templates/                 # Dashboard Layout Sistemi
│   ├── PROMPT.md                               # Layout kullanım talimatları
│   ├── navbar.tsx                              # Dashboard navbar
│   ├── sidebar.tsx                             # Dashboard sidebar
│   ├── user-menu.tsx                           # User dropdown menu
│   └── mobile-menu.tsx                         # Mobile sheet menu
│
├── dashboard-page-templates/                   # Dashboard Sayfa Template'leri
│   ├── PROMPT.md                               # Sayfa kullanım talimatları
│   ├── dashboard-home.tsx                      # Dashboard ana sayfa
│   ├── profile-page.tsx                        # Profil sayfası
│   ├── settings-page.tsx                       # Ayarlar sayfası
│   ├── billing-page.tsx                        # Faturalandırma sayfası
│   └── admin-page.tsx                          # Admin paneli sayfası
│
├── api-route-templates/                        # API Route Template'leri
│   ├── PROMPT.md                               # API kullanım talimatları
│   ├── user-api.ts                             # User CRUD API
│   ├── profile-api.ts                          # Profile management API
│   ├── password-api.ts                         # Password change API
│   ├── stripe-checkout-api.ts                  # Stripe checkout API
│   └── stripe-webhook-api.ts                   # Stripe webhook handler
│
├── database-schema-templates/                  # Database Schema Eklemeleri
│   ├── PROMPT.md                               # Schema kullanım talimatları
│   └── schema-extensions.prisma                # Subscription, Invoice, AuditLog
│
├── email-templates/                            # Email Templates (React Email)
│   ├── PROMPT.md                               # Email kullanım talimatları
│   ├── welcome-email.tsx                       # Hoş geldin email'i
│   ├── reset-password-email.tsx                # Password reset email'i
│   ├── invoice-email.tsx                       # Fatura bildirimi
│   └── subscription-email.tsx                  # Abonelik yenileme bildirimi
│
├── utility-hook-templates/                     # Utility Functions & Hooks
│   ├── PROMPT.md                               # Utility kullanım talimatları
│   ├── validation.ts                           # Zod validation schemas
│   ├── stripe.ts                               # Stripe helper functions
│   ├── email.ts                                # Email helper functions
│   ├── use-auth.ts                             # useAuth hook
│   ├── use-user.ts                             # useUser hook
│   └── use-form.ts                             # useForm hook
│
└── ui-component-templates/                     # UI Component Library
    ├── PROMPT.md                               # Component kullanım talimatları
    ├── stat-card.tsx                           # İstatistik kartı
    ├── data-table.tsx                          # Veri tablosu
    ├── empty-state.tsx                         # Boş durum gösterimi
    ├── loading-spinner.tsx                     # Yükleme animasyonu
    ├── error-alert.tsx                         # Hata bildirimi
    └── profile-edit-dialog.tsx                 # Profil düzenleme dialog
```

## 🤖 AI Agent İçin Kullanım Talimatları

### Adım 1: İlgili Template Kategorisini Bul

Kullanıcı ne istediğini belirttiğinde:
1. İlgili template kategorisini belirle (örn: "login sayfası" → `core-auth-templates/`)
2. O kategorinin `PROMPT.md` dosyasını oku
3. Template dosyalarını incele

### Adım 2: Template Dosyalarını Projeye Entegre Et

Her template kategorisinin kendi `PROMPT.md` dosyasında:
- ✅ Hangi dosyaların nereye kopyalanacağı
- ✅ Gerekli bağımlılıklar
- ✅ Environment variables
- ✅ Kurulum adımları
- ✅ Kullanım örnekleri

### Adım 3: Kullanıcı İhtiyacına Göre Customizasyon

Template'leri kullanıcı isteğine göre:
- ✅ Rename (isim değiştirme)
- ✅ Modify (içerik değiştirme)
- ✅ Extend (yeni özellik ekleme)
- ✅ Remove (kaldırma)

**ÖNEMLİ**: Core functionality (security, validation, error handling) asla kaldırılmamalı!

## 📋 Template Kategorileri ve Kullanımları

### 1. Core Auth Templates
📁 `templates/core-auth-templates/`

**Ne İşe Yarar:**
- Login/Register sayfaları
- Authentication middleware
- User registration API

**Kullanım Senaryoları:**
- "Login sayfası eklemek istiyorum"
- "Kullanıcı kayıt sistemi kurmam lazım"
- "Auth protection eklemeliyim"

### 2. Dashboard Layout Templates
📁 `templates/dashboard-layout-templates/`

**Ne İşe Yarar:**
- Dashboard navigation bar
- Sidebar menu
- User dropdown menu
- Mobile responsive menu

**Kullanım Senaryoları:**
- "Dashboard menü sistemi istiyorum"
- "Sidebar eklemeliyim"
- "Mobil uyumlu menü lazım"

### 3. Dashboard Page Templates
📁 `templates/dashboard-page-templates/`

**Ne İşe Yarar:**
- Dashboard home (istatistikler)
- Profile page
- Settings page
- Billing page (Stripe)
- Admin page

**Kullanım Senaryoları:**
- "Dashboard ana sayfası istiyorum"
- "Profil düzenleme sayfası lazım"
- "Faturalandırma sistemi kurmam gerekiyor"
- "Admin paneli eklemeliyim"

### 4. API Route Templates
📁 `templates/api-route-templates/`

**Ne İşe Yarar:**
- User CRUD operations
- Profile management
- Password change
- Stripe checkout/webhook

**Kullanım Senaryoları:**
- "Kullanıcı API'si lazım"
- "Stripe entegrasyonu yapmalıyım"
- "Password reset API istiyorum"

### 5. Database Schema Templates
📁 `templates/database-schema-templates/`

**Ne İşe Yarar:**
- Subscription model
- Invoice model
- AuditLog model

**Kullanım Senaryoları:**
- "Abonelik sistemi eklemeliyim"
- "Fatura geçmişi tutmam lazım"
- "Admin log sistemi istiyorum"

### 6. Email Templates
📁 `templates/email-templates/`

**Ne İşe Yarar:**
- Welcome email
- Password reset
- Invoice notifications
- Subscription renewals

**Kullanım Senaryoları:**
- "Hoş geldin email'i göndermeliyim"
- "Password reset email'i lazım"
- "Fatura bildirimi yapmalıyım"

### 7. Utility & Hook Templates
📁 `templates/utility-hook-templates/`

**Ne İşe Yarar:**
- Validation schemas (Zod)
- Stripe helpers
- Email helpers
- Custom React hooks

**Kullanım Senaryoları:**
- "Form validation lazım"
- "Stripe entegrasyonu için helper'lar istiyorum"
- "Custom hook kullanmalıyım"

### 8. UI Component Templates
📁 `templates/ui-component-templates/`

**Ne İşe Yarar:**
- StatCard (istatistik kartı)
- DataTable (veri tablosu)
- EmptyState (boş durum)
- LoadingSpinner (yükleme)
- ErrorAlert (hata)

**Kullanım Senaryoları:**
- "İstatistik kartı component'i lazım"
- "Veri tablosu göstermem gerekiyor"
- "Loading state için component istiyorum"

## 🔄 Tipik AI Agent İş Akışı

### Örnek 1: Login Sayfası İsteği

```
Kullanıcı: "Login sayfası eklemek istiyorum"

AI Agent:
1. templates/core-auth-templates/PROMPT.md oku
2. Login sayfası template'ini anlayın:
   - login-page.tsx → src/app/login/page.tsx
   - middleware.ts → src/middleware.ts
   - Gerekli shadcn/ui component'leri
3. Dosyaları kopyala ve projeye entegre et
4. Environment variables'ı kontrol et
5. Test et ve kullanıcıya bilgilendir
```

### Örnek 2: Dashboard Ana Sayfası

```
Kullanıcı: "Dashboard home page istiyorum"

AI Agent:
1. templates/dashboard-page-templates/PROMPT.md oku
2. Dashboard home template'ini anlayın:
   - dashboard-home.tsx → src/app/(dashboard)/page.tsx
   - Gerekli component'ler (StatCard, vb.)
   - API route'lar (gerekirse)
3. Dosyaları kopyala
4. İlgili component'leri ekle
5. Prisma migration yap (gerekirse)
```

### Örnek 3: Profil Sayfasına Özellik Ekleme

```
Kullanıcı: "Profil sayfasına telefon numarası eklemek istiyorum"

AI Agent:
1. templates/dashboard-page-templates/PROMPT.md oku
2. Mevcut profile-page.tsx template'ini incele
3. Aşağıdaki değişiklikleri yap:
   - Form field'ı ekle
   - Validation schema güncelle
   - Prisma model güncelle (phone field)
   - API update
   - Type definitions güncelle
4. Test et
```

## ✅ AI Agent Kuralları

### Yapılması Gerekenler

1. **Template'in amacını anla**: Her template'in ne işe yaradığını oku
2. **Kullanıcıya rehberlik et**: Template'i nasıl kullanacağını göster
3. **Customization yap**: Kullanıcı ihtiyacına göre template'i değiştir
4. **Best practice'leri koru**: Template'lerdeki best practice'leri koru
5. **Type safety**: TypeScript type safety'ini koru
6. **Security**: Validation ve error handling'i koru

### Yapılmaması Gerekenler

1. ❌ Template'i bozma: Core functionality'i değiştirme
2. ❌ Security'i azaltma: Validation ve error handling'i kaldırma
3. ❌ Over-engineering: Gereksiz karmaşıklık ekleme
4. ❌ Hardcoding: Configurable değerleri hardcoded yapma
5. ❌ Breaking changes: Mevcut functionality'i bozucu değişiklikler yapma

## 🎯 Template Dosya Formatı

Her template dosyası şu yapıyı izler:

```typescript
/**
 * ============================================
 * TEMPLATE: [Template Adı]
 * ============================================
 *
 * Açıklama: Bu template ne işe yarıyor
 *
 * Özellikler:
 * - Feature 1
 * - Feature 2
 * - Feature 3
 *
 * Kurulum:
 * 1. Bu dosyayı [HEDEF YOL]'a kopyalayın
 * 2. [BAĞIMLILIK 1] ekleyin
 * 3. [ENV VAR] ayarlayın
 * 4. [MIGRATION] çalıştırın
 *
 * Kullanım:
 * ```tsx
 * // Example usage
 * ```
 *
 * Notlar:
 * - Important note 1
 * - Important note 2
 *
 * @see templates/[KATEGORI]/PROMPT.md
 * ============================================
 */
```

## 📦 Template Özellikleri

### Tüm Template'ler Şunları İçerir:

✅ **Type-Safe**: Full TypeScript desteği
✅ **Production Ready**: Error handling, validation, security
✅ **Responsive**: Mobile-first design
✅ **Accessible**: ARIA labels, keyboard navigation
✅ **Modern UI**: shadcn/ui + Tailwind CSS
✅ **Well Documented**: JSDoc comments ve açıklamalar
✅ **Easy to Customize**: Kolay customize edilebilir yapı

### Teknoloji Stack:

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Library**: shadcn/ui
- **Database**: PostgreSQL + Prisma
- **Auth**: NextAuth.js
- **Payment**: Stripe
- **Email**: Resend + React Email
- **Forms**: React Hook Form + Zod
- **State**: TanStack Query
- **Icons**: Lucide React

## 🔗 İlişkili Dosyalar

- `/PLAN.md` - Geliştirme planı ve aşamalar
- `/CLAUDE.md` - Proje yapısı ve geliştirme talimatları
- `/README.md` - Ana proje README

## 📝 Notlar

- Template'ler **bağımsız** çalışabilir veya birlikte kullanılabilir
- Her template kendi bağımlılıklarını belirtir
- Gerekli environment variables dosyalarda belirtilmiştir
- Prisma migration'ları unutmayın
- Kullanıcılar template'leri istedikleri gibi değiştirebilir

---

**Template Versiyonu**: 1.0.0
**Son Güncelleme**: 2025-01-18
**AI Agent Uyumluluk**: ✅ Claude Code, ✅ GitHub Copilot, ✅ Cursor
