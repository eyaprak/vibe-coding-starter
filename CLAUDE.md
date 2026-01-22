# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development Workflow
```bash
npm run dev          # Start dev server with Turbopack (includes NODE_OPTIONS for larger headers)
npm run build        # Build for production (runs prisma generate + next build)
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database Operations
```bash
npm run db:push      # Push Prisma schema changes to database (development)
npm run db:generate  # Generate Prisma client (run after schema changes)
```

### Adding UI Components
```bash
npx shadcn@latest add [component-name]  # Add shadcn/ui components
```

## Technology Stack

**Frontend Framework:** Next.js 16 with App Router, Server Components, and Turbopack
**Language:** TypeScript 5 with strict mode
**Styling:** Tailwind CSS 4 with shadcn/ui component library
**Database:** PostgreSQL with Prisma ORM (Supabase-hosted)
**Authentication:** NextAuth.js 4.24.11 with JWT sessions and credentials provider
**Additional Services:** Stripe (payments), Resend + React Email (emails), reCAPTCHA v3 (security), TanStack Query (data fetching)

## Architecture Overview

### Next.js App Router Structure
This is a **Next.js 16 App Router** application using the modern app directory structure:

- **Server Components by Default:** All components in `src/app/` are Server Components unless marked with `"use client"`
- **Route Groups:** Parenthesized folders like `(dashboard)` create logical route groups without affecting URL structure
- **Layout Hierarchy:** Each route group can have its own `layout.tsx` that wraps its child routes

**Key Entry Points:**
- `src/app/layout.tsx` - Root layout with dark mode (`<html lang="tr" className="dark">`), Toaster for notifications
- `src/app/page.tsx` - Public landing page
- `src/app/(dashboard)/` - Protected dashboard routes (requires authentication)
- `src/app/api/auth/[...nextauth]/` - NextAuth.js dynamic API route

### Authentication Architecture

**JWT-Based Sessions with NextAuth:**
- Configuration: `src/lib/auth.ts` exports `authOptions: NextAuthOptions`
- Strategy: JWT sessions (not database sessions)
- Provider: Credentials-based (email/password with bcrypt hashing)
- Custom Callbacks: JWT callback adds `id` and `role` to token; Session callback adds them to session
- Custom Pages: Sign in/error pages at `/login`
- Role-Based Access: User model has `Role` enum (USER/ADMIN)

**Important:** TypeScript types are extended in `src/types/index.ts` to include `id` and `role` on NextAuth's `User` and `Session` types.

### Database Architecture (Prisma)

**Hybrid Prisma + Supabase Setup:**
- Prisma ORM with PostgreSQL database (hosted on Supabase)
- Schema: `prisma/schema.prisma` defines User, Account, Session, VerificationToken models
- Client: `src/lib/prisma.ts` exports singleton Prisma client instance
- NextAuth Integration: Uses `@auth/prisma-adapter` for database-backed sessions/accounts
- Role System: User model has `role` field with enum (USER/ADMIN)

**Database URL Requirements:**
- `DATABASE_URL` - Pooler connection URL (standard Prisma connection)
- `DIRECT_URL` - Direct connection URL (required for migrations with Supabase)

### Component Architecture

**shadcn/ui Pattern:**
- Components are located in `src/components/ui/`
- Uses `class-variance-authority` for variant-based styling
- Components are Client Components (use `"use client"` directive)
- TypeScript interfaces with `forwardRef` pattern for refs
- Utility function `cn()` in `src/lib/utils.ts` combines Tailwind classes using `clsx` and `tailwind-merge`

**Adding New Components:**
```bash
npx shadcn@latest add button
```
This adds the component to `src/components/ui/` and automatically updates imports.

### Path Aliases

**TypeScript Configuration (`tsconfig.json`):**
- `@/*` maps to `./src/*`
- Example: `@/lib/auth` → `src/lib/auth`
- shadcn/ui aliases configured in `components.json`

### Environment Variables

Required environment variables (create `.env` from `.env.example`):
- `DATABASE_URL` - PostgreSQL connection URL (Supabase pooler)
- `DIRECT_URL` - Direct PostgreSQL connection (Supabase direct connection)
- `NEXTAUTH_SECRET` - Secret for NextAuth JWT signing
- NextAuth credentials provider configuration
- Stripe API keys (if using payments)
- Resend API key (if sending emails)
- reCAPTCHA keys (if using bot protection)

## Development Workflow

### Making Database Schema Changes
1. Edit `prisma/schema.prisma`
2. Run `npm run db:push` to push changes to database (development)
3. Run `npm run db:generate` to regenerate Prisma client types
4. Use generated types in your code

### Working with Authentication
- Import `authOptions` from `@/lib/auth` for NextAuth configuration
- Use `getServerSession(authOptions)` in Server Components to get session
- Extended types include `user.id` and `user.role` on session
- Protected routes should check for session existence

### Using shadcn/ui Components
- Import from `@/components/ui/[component-name]`
- All components support variants via `className` prop
- Components use CSS variables for theming (dark mode support built-in)
- Check existing components (Button, Card, Input) for patterns

## Important Notes

### Node Options
The `dev` and `start` scripts include `NODE_OPTIONS=--max-http-header-size=16384` to handle larger HTTP headers (required for certain integrations like Supabase auth).

### Build Process
The `build` command automatically runs `prisma generate` before `next build` to ensure Prisma client is up-to-date.

### Language
The application is set up for Turkish language (`lang="tr"` in root layout), but can be changed to English or other languages.

### Dark Mode
The application defaults to dark mode (`className="dark"` on `<html>` element). Theme switching would require implementing a theme toggle.

### Supabase Image Optimization
Next.js is configured to allow image optimization for Supabase URLs (`**.supabase.co` in `next.config.js`).

## 🚀 Template Sistemi v1.0

### Genel Bakış

Bu proje **33 production-ready template** içeren bir starter kit'tir. Her template AI agent uyumlu olarak dokümante edilmiştir ve kolayca projeye entegre edilebilir.

### Template Klasör Yapısı

```
templates/
├── PROMPT.md                              # Ana AI agent rehberi
├── core-auth-templates/                   # Authentication template'leri
│   ├── PROMPT.md                          # Core auth kullanım talimatları
│   ├── middleware.ts
│   ├── login-page.tsx
│   ├── register-page.tsx
│   └── register-api.ts
├── dashboard-layout-templates/            # Dashboard layout component'leri
│   ├── PROMPT.md
│   ├── navbar.tsx
│   ├── sidebar.tsx
│   ├── user-menu.tsx
│   └── mobile-menu.tsx
├── dashboard-page-templates/              # Dashboard sayfa template'leri
│   ├── PROMPT.md
│   ├── dashboard-home.tsx
│   ├── profile-page.tsx
│   ├── settings-page.tsx
│   ├── billing-page.tsx
│   └── admin-page.tsx
├── api-route-templates/                   # API route template'leri
│   ├── PROMPT.md
│   ├── user-api.ts
│   ├── profile-api.ts
│   ├── password-api.ts
│   ├── stripe-checkout-api.ts
│   └── stripe-webhook-api.ts
├── database-schema-templates/             # Database schema eklemeleri
│   ├── PROMPT.md
│   └── schema-extensions.prisma
├── email-templates/                       # React Email template'leri
│   ├── PROMPT.md
│   ├── welcome-email.tsx
│   ├── reset-password-email.tsx
│   ├── invoice-email.tsx
│   └── subscription-email.tsx
├── utility-hook-templates/                # Utility fonksiyonları ve hooks
│   ├── PROMPT.md
│   ├── validation.ts
│   ├── stripe.ts
│   ├── email.ts
│   ├── use-auth.ts
│   ├── use-user.ts
│   └── use-form.ts
└── ui-component-templates/                 # UI component template'leri
    ├── PROMPT.md
    ├── stat-card.tsx
    ├── data-table.tsx
    ├── empty-state.tsx
    ├── loading-spinner.tsx
    └── error-alert.tsx
```

### Template Showcase Sayfası

Tüm template'leri görsel olarak inceleyin:

```bash
npm run dev
# Ziyaret et: http://localhost:3000/templates
```

**Showcase Özellikleri:**
- 8 kategoride 33 template
- Her template için açıklama ve özellik listesi
- Live preview link'leri
- Tek tıkla kopyalama
- AI agent kullanım örnekleri

### AI Agent ile Kullanım

#### 1. Ana Rehberi Oku

Claude Code, Cursor veya GitHub Copilot ile:

```
@templates/PROMPT.md
```

Bu dosya tüm template sistemini açıklar ve AI agent'ların doğru template'i bulmasını sağlar.

#### 2. Kategori Rehberi Oku

Belirli bir kategori için:

```
@templates/dashboard-page-templates/PROMPT.md
```

#### 3. Template İsteği

Örnek prompt'lar:

```
# Dashboard home sayfası ekle
@templates/PROMPT.md
Dashboard home sayfasını eklemek istiyorum. StatCard component'leri de gerekiyor.

# Profil sayfasını özelleştir
@templates/PROMPT.md
Profil sayfasına telefon numarası field'ı eklemek istiyorum. Mevcut template'i güncelle.

# Full auth sistemi kur
@templates/core-auth-templates/PROMPT.md
Login, register sayfalarını ve middleware'i projeme entegre et.
```

#### 4. AI Agent Ne Yapar?

AI agent otomatik olarak:
- ✅ İlgili template dosyasını bulur
- ✅ PROMPT.md'den kurulum adımlarını okur
- ✅ Dosyayı projeye kopyalar/entegre eder
- ✅ Gerekli bağımlılıkları ekler (shadcn/ui components)
- ✅ Import yollarını düzeltir
- ✅ Environment variables'ı kontrol eder
- ✅ Test eder

### Manuel Template Kullanımı

#### Adım Adım Entegrasyon

**Örnek: Login Sayfası**

1. Template'i bulun:
```
templates/core-auth-templates/login-page.tsx
```

2. Projenize kopyalayın:
```bash
# Klasör oluşturun
mkdir -p src/app/login

# Template'i kopyalayın
cp templates/core-auth-templates/login-page.tsx src/app/login/page.tsx
```

3. Gerekli bağımlılıkları ekleyin:
```bash
# shadcn/ui components (zaten kurulu olmalı)
npx shadcn@latest add button input label form
```

4. Environment variables'ı kontrol edin:
- NextAuth configuration (@/lib/auth)
- Database connection

5. Test edin:
```bash
npm run dev
# Git: http://localhost:3000/login
```

### Template İçeriği

#### Core Auth Templates (4)
- **login-page.tsx** - Email/password form, Zod validation, NextAuth signIn
- **register-page.tsx** - Name, email, password form, password strength indicator
- **middleware.ts** - Route protection, auth control, admin-only routes
- **register-api.ts** - User registration endpoint, email check, password hash

#### Dashboard Layout Templates (4)
- **navbar.tsx** - Sticky navbar, blur effect, mobile menu toggle
- **sidebar.tsx** - Navigation menu, active link highlighting, role-based links
- **user-menu.tsx** - User dropdown, avatar display, logout confirm dialog
- **mobile-menu.tsx** - Sheet component, full-height mobile menu

#### Dashboard Page Templates (5)
- **dashboard-home.tsx** - Stats, quick actions, recent activities
- **profile-page.tsx** - Profile display, edit form, avatar upload
- **settings-page.tsx** - Account/security/notifications tabs
- **billing-page.tsx** - Subscription info, invoice history, Stripe integration
- **admin-page.tsx** - User list, search/filter, admin stats

#### API Route Templates (5)
- **user-api.ts** - GET/DELETE user endpoints
- **profile-api.ts** - Profile CRUD operations
- **password-api.ts** - Password change with validation
- **stripe-checkout-api.ts** - Stripe checkout session creation
- **stripe-webhook-api.ts** - Stripe webhook handler

#### Database Schema Templates (1)
- **schema-extensions.prisma** - Subscription, Invoice, AuditLog models

#### Email Templates (4)
- **welcome-email.tsx** - Welcome email with quick links
- **reset-password-email.tsx** - Password reset with security warning
- **invoice-email.tsx** - Invoice notification with PDF download
- **subscription-email.tsx** - Subscription renewal notification

#### Utility & Hook Templates (6)
- **validation.ts** - Zod schemas (register, login, profile, password)
- **stripe.ts** - Stripe helper functions
- **email.ts** - Email sending functions
- **use-auth.ts** - Auth state management hook
- **use-user.ts** - User data fetching hook
- **use-form.ts** - Form handling wrapper hook

#### UI Component Templates (5)
- **stat-card.tsx** - Statistics card with trend
- **data-table.tsx** - Data table with pagination and sorting
- **empty-state.tsx** - Empty state display
- **loading-spinner.tsx** - Loading animation
- **error-alert.tsx** - Error alert with retry button

### Template Özellikleri

Her template şunları içerir:
- ✅ **JSDoc Comments** - Açıklama ve kullanım talimatları
- ✅ **TypeScript** - Full type safety
- ✅ **Production Ready** - Error handling, validation
- ✅ **Best Practices** - Modern Next.js patterns
- ✅ **AI Agent Uyumlu** - Claude Code, Cursor, Copilot ile çalışır
- ✅ **Kolay Customizable** - İhtiyaca göre değiştirilebilir

### PROMPT.md Sistemi

Her template kategorisinin kendi `PROMPT.md` dosyası vardır:

**Ana PROMPT.md** (`templates/PROMPT.md`):
- Tüm sistemi açıklar
- AI agent için genel rehber
- Kategorileri listeler
- Örnek senaryolar

**Kategori PROMPT.md** (örn: `templates/core-auth-templates/PROMPT.md`):
- O kategorideki template'leri açıklar
- Kurulum adımlarını verir
- Bağımlılıkları listeler
- Özelleştirme ipuçları verir

### Gelişmiş Kullanım Senaryoları

#### Senaryo 1: Full Auth Sistemi

```
@templates/core-auth-templates/PROMPT.md

Tüm authentication sistemini kur:
1. Login sayfası
2. Register sayfası
3. Middleware (route protection)
4. Register API

AI agent:
- 4 template dosyasını entegre eder
- shadcn/ui components'leri ekler
- @/lib/auth configuration'ı kontrol eder
- Prisma schema'yı kontrol eder
```

#### Senaryo 2: Dashboard Layout + Sayfalar

```
@templates/PROMPT.md

Dashboard sayfalarını eklemek istiyorum:
1. Navbar, sidebar, user menu
2. Dashboard home page
3. Profile page

AI agent:
- Layout component'lerini ekler
- Sayfa template'lerini kopyalar
- StatCard component'ini ekler
- Routing'i kurar
```

#### Senaryo 3: Stripe Entegrasyonu

```
@templates/PROMPT.md

Stripe ödeme sistemi eklemek istiyorum:
1. Billing page
2. Checkout API
3. Webhook handler
4. Database schema (Subscription, Invoice)

AI agent:
- Template'leri entegre eder
- Prisma schema'yı günceller
- Environment variables'ı kontrol eder
- npm run db:push çalıştırır
```

### Önemli Notlar

1. **Template'ler Bağımsız Çalışabilir**: Her template tek başına veya birlikte kullanılabilir
2. **Core Function'u Koru**: Security, validation, error handling asla kaldırılmamalı
3. **Customization Kolay**: Her template ihtiyaca göre kolayca değiştirilebilir
4. **AI Agent Uyumluluğu**: Her template AI tarafından anlaşılacak şekilde yazılmıştır
5. **Production Ready**: Tüm template'ler production kullanıma hazır

### Yardım ve Destek

- **Template Showcase**: [http://localhost:3000/templates](http://localhost:3000/templates)
- **Ana PROMPT.md**: `/templates/PROMPT.md`
- **Kategori Rehberleri**: `/templates/[kategori-adi]/PROMPT.md`
