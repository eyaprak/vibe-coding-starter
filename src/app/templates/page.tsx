/**
 * Vibe Coding Starter - Template Showcase Page
 *
 * Tüm hazır template'leri görsel olarak sergileyen basit ve kullanışlı sayfa.
 * Her template için hazır AI agent prompt şablonları içerir.
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, FileCode, Settings, Shield, Copy, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Icon'lar
const Icons = {
  Lock: () => "🔒",
  LayoutDashboard: () => "📊",
  User: () => "👤",
  Settings: () => "⚙️",
  CreditCard: () => "💳",
  Shield: () => "🛡️",
  FileCode: () => "📄",
  Database: () => "🗄️",
  Mail: () => "📧",
  ToolCase: () => "🔧",
  Box: () => "📦",
  Code: () => "💻",
  Table: () => "📋",
  Circle: () => "⭕",
};

// Template kategorileri
const templateCategories = [
  {
    id: "core-auth",
    title: "Core Authentication",
    description: "Kullanıcı giriş, kayıt ve route koruma sistemleri",
    color: "bg-red-500",
    icon: "Lock",
    templates: [
      {
        name: "Login Page",
        file: "login-page.tsx",
        route: "/login",
        description: "Modern login sayfası. Email/password form, Zod validation, NextAuth signIn entegrasyonu, error handling (toast notifications).",
        prompt: `Dashboard login sayfası eklemek istiyorum.
@templates/core-auth-templates/PROMPT.md
Login page template'ini projeme entegre eder misin? Şunları da yap:
- src/app/login/page.tsx olarak kopyala
- Gerekli shadcn/ui component'lerini kontrol et (button, input, label, form)
- useToast hook'unun kullanıldığından emin ol
- NextAuth configuration'ı kontrol et (@/lib/auth)`,
      },
      {
        name: "Register Page",
        file: "register-page.tsx",
        route: "/register",
        description: "Kullanıcı kayıt sayfası. Name, email, password formu, password strength indicator (görsel feedback ile), Zod validation, otomatik giriş.",
        prompt: `Register sayfası eklemek istiyorum.
@templates/core-auth-templates/PROMPT.md
Register page template'ini src/app/register/page.tsx olarak kopyalar mısın? Password strength indicator'ın çalışması için gerekli component'leri de ekler misin?`,
      },
      {
        name: "Middleware",
        file: "middleware.ts",
        route: null,
        description: "NextAuth middleware. Route protection, auth control, admin-only routes, redirect logic. Giriş yapmamış kullanıcıları korumalı route'lardan engeller, yönlendirir.",
        prompt: `Middleware eklemek istiyorum.
@templates/core-auth-templates/PROMPT.md
src/middleware.ts olarak ekleyebilir misin? Ayrıca dashboard route'larını da korumaya al.`,
      },
      {
        name: "Register API",
        file: "register-api.ts",
        route: "/api/register",
        description: "Kullanıcı kayıt API endpoint'i. Email duplicate check, bcrypt password hash, Prisma user creation. NextAuth credentials provider ile uyumlu.",
        prompt: `Register API endpoint'i eklemek istiyorum.
@templates/api-route-templates/PROMPT.md
src/app/api/register/route.ts olarak ekler misin? Email validasyonu ve password hash'lenmesi için gerekli kontroleri yap.`,
      },
    ],
  },
  {
    id: "dashboard-layout",
    title: "Dashboard Layout",
    description: "Dashboard navigation ve layout component'leri",
    color: "bg-blue-500",
    icon: "LayoutDashboard",
    templates: [
      {
        name: "Dashboard Navbar",
        file: "navbar.tsx",
        route: null,
        description: "Dashboard navbar component'i. Sticky positioning, blur effect (backdrop-filter), logo, mobile menu toggle button, user menu (avatar + dropdown)",
        prompt: `Dashboard navbar component'i eklemek istiyorum.
@templates/dashboard-layout-templates/PROMPT.md
DashboardNavbar component'ini src/components/dashboard/navbar.tsx olarak ekler misin? Sticky navbar ve blur effect için gerekli stilleri uygula.`,
      },
      {
        name: "Dashboard Sidebar",
        file: "sidebar.tsx",
        route: null,
        description: "Dashboard sidebar component'i. Navigation menu (Dashboard, Profil, Ayarlar, Faturalar, Admin), active link highlighting, role-based link filtering.",
        prompt: `Dashboard sidebar'ı eklemek istiyorum.
@templates/dashboard-layout-templates/PROMPT.md
Sidebar component'ini src/components/dashboard/sidebar.tsx olarak ekler misin? Navigation link'leri ve active highlighting özelliklerini kontrol et.`,
      },
      {
        name: "User Menu",
        file: "user-menu.tsx",
        route: null,
        description: "Kullanıcı dropdown menü component'i. Avatar display (initials veya image), dropdown actions (Profil, Ayarlar, Faturalar, Çıkış Yap), logout confirm dialog.",
        prompt: `UserMenu dropdown menüsü eklemek istiyorum.
@templates/dashboard-layout-templates/PROMPT.md
src/components/dashboard/user-menu.tsx olarak ekler misin? Avatar display ve logout confirm dialog'u kontrol et.`,
      },
      {
        name: "Mobile Menu",
        file: "mobile-menu.tsx",
        route: null,
        description: "Mobil uyumlu menü. Sheet (drawer) component, hamburger menu toggle, sidebar ile aynı navigation linkleri, close button.",
        prompt: `Mobile menu component'i eklemek istiyorum.
@templates/dashboard-layout-templates/PROMPT.md
MobileMenu component'ini src/components/dashboard/mobile-menu.tsx olarak ekler misin? Sheet component'inin doğru çalıştığını kontrol et.`,
      },
    ],
  },
  {
    id: "dashboard-pages",
    title: "Dashboard Sayfaları",
    description: "Dashboard ana sayfa, profil, ayarlar, faturalandırma ve admin paneli",
    color: "bg-green-500",
    icon: "User",
    templates: [
      {
        name: "Dashboard Home",
        file: "dashboard-home.tsx",
        route: "/dashboard",
        description: "Dashboard ana sayfa. Hoş geldin mesajı, StatCard component'leri (istatistik kartları), quick actions, son aktiviteler listesi.",
        prompt: `Dashboard home sayfasını eklemek istiyorum.
@templates/dashboard-page-templates/PROMPT.md
DashboardHome template'ini src/app/(dashboard)/page.tsx olarak ekler misin? Gerekli StatCard component'ini de ekler misin?`,
      },
      {
        name: "Profile Page",
        file: "profile-page.tsx",
        route: "/dashboard/profile",
        description: "Profil sayfası. Kullanıcı bilgileri card, düzenleme formu, avatar upload (Supabase storage). Name, email, bio, location fields.",
        prompt: `Profil sayfası eklemek istiyorum.
@templates/dashboard-page-templates/PROMPT.md
ProfilePage template'ini src/app/(dashboard)/profile/page.tsx olarak ekler misin? Form field'ları ve avatar upload özelliklerini kontrol et.`,
      },
      {
        name: "Settings Page",
        file: "settings-page.tsx",
        route: "/dashboard/settings",
        description: "Ayarlar sayfası. Tabs ile organize edilmiş: Hesap (email değiştir, hesap sil), Güvenlik (password değiştir), Bildirimler (email notifications).",
        prompt: `Settings sayfasını eklemek istiyorum.
@templates/dashboard-page-templates/PROMPT.md
SettingsPage template'ini src/app/(dashboard)/settings/page.tsx olarak ekler misin? Tabs organizasyonunu ve password change form'unu kontrol et.`,
      },
      {
        name: "Billing Page",
        file: "billing-page.tsx",
        route: "/dashboard/billing",
        description: "Faturalandırma sayfası. Mevcut plan card, kullanım istatistikleri, upgrade/downgrade butonları, fatura geçmişi table, Stripe portal link.",
        prompt: `Billing sayfası eklemek istiyorum.
@templates/dashboard-page-templates/PROMPT.md
BillingPage template'ini src/app/(dashboard)/billing/page.tsx olarak ekler misin? Stripe entegrasyonunu ve fatura geçmişini kontrol et.`,
      },
      {
        name: "Admin Page",
        file: "admin-page.tsx",
        route: "/dashboard/admin",
        description: "Admin paneli sayfası. Kullanıcı listesi (DataTable), filtreleme (role, date), arama (email/name), bulk actions (delete, role change), pagination.",
        prompt: `Admin paneli sayfası eklemek istiyorum.
@templates/dashboard-page-templates/PROMPT.md
AdminPage template'ini src/app/(dashboard)/admin/page.tsx olarak ekler misin? DataTable component'ini ve admin-only middleware kontrolünü kontrol et.`,
      },
    ],
  },
  {
    id: "api-routes",
    title: "API Routes",
    description: "User, profile, password ve Stripe API endpoint'leri",
    color: "bg-purple-500",
    icon: "Settings",
    templates: [
      {
        name: "User API",
        file: "user-api.ts",
        route: "/api/user",
        description: "Kullanıcı bilgisi GET endpoint'i ve hesap silme DELETE endpoint'i. Session kontrolü, Prisma user operations.",
        prompt: `User API endpoint'leri eklemek istiyorum.
@templates/api-route-templates/PROMPT.md
UserAPI template'ini src/app/api/user/route.ts olarak ekler misin? GET ve DELETE endpoint'lerini kontrol et.`,
      },
      {
        name: "Profile API",
        file: "profile-api.ts",
        route: "/api/user/profile",
        description: "Profil bilgileri GET endpoint'i ve güncelleme PUT endpoint'i. Zod validation, name ve image güncelleme.",
        prompt: `Profile API endpoint'lerini eklemek istiyorum.
@templates/api-route-templates/PROMPT.md
ProfileAPI template'ini src/app/api/user/profile/route.ts olarak ekler misin? Validation ve update işlemlerini kontrol et.`,
      },
      {
        name: "Password API",
        file: "password-api.ts",
        route: "/api/user/password",
        description: "Şifre değiştirme PUT endpoint'i. Mevcut password kontrolü, yeni password hash'leme, validation.",
        prompt: `Password API endpoint'ini eklemek istiyorum.
@templates/api-route-templates/PROMPT.md
PasswordAPI template'ini src/app/api/user/password/route.ts olarak ekler misin? Mevcut password kontrolü ve hash işlemlerini kontrol et.`,
      },
      {
        name: "Stripe Checkout API",
        file: "stripe-checkout-api.ts",
        route: "/api/checkout",
        description: "Stripe checkout session oluşturma POST endpoint'i. Stripe customer management, price ID selection, success/cancel URL'leri.",
        prompt: `Stripe checkout API eklemek istiyorum.
@templates/api-route-templates/PROMPT.md
StripeCheckoutAPI template'ini src/app/api/checkout/route.ts olarak ekler misin? Stripe secret key ve environment variables'ı kontrol et.`,
      },
      {
        name: "Stripe Webhook API",
        file: "stripe-webhook-api.ts",
        route: "/api/webhooks/stripe",
        description: "Stripe webhook handler POST endpoint'i. Signature verification, event handling (checkout.session.completed, customer.subscription.updated, invoice.paid), database güncelleme.",
        prompt: `Stripe webhook handler eklemek istiyorum.
@templates/api-route-templates/PROMPT.md
StripeWebhookAPI template'ini src/app/api/webhooks/stripe/route.ts olarak ekler misin? Webhook signature verification ve event handling'i kontrol et.`,
      },
    ],
  },
  {
    id: "database",
    title: "Database Schema",
    description: "Prisma modelleri ve database extensions",
    color: "bg-orange-500",
    icon: "Database",
    templates: [
      {
        name: "Schema Extensions",
        file: "schema-extensions.prisma",
        route: null,
        description: "Prisma schema eklemeleri. Subscription model (stripeCustomerId, stripeSubscriptionId, stripePriceId, status, currentPeriodEnd), Invoice model (stripeInvoiceId, amount, currency, status, dueDate, paidAt), AuditLog model (action, entity, entityId, metadata, ipAddress, userAgent).",
        prompt: `Database schema eklemeleri eklemek istiyorum.
@templates/database-schema-templates/PROMPT.md
SchemaExtensions template'ini kullanarak Prisma schema'ya Subscription, Invoice, AuditLog modellerini ekler misin? npm run db:push ve npm run db:generate komutlarını çalıştır.`,
      },
    ],
  },
  {
    id: "emails",
    title: "Email Templates",
    description: "React Email template'leri (Resend)",
    color: "bg-pink-500",
    icon: "Mail",
    templates: [
      {
        name: "Welcome Email",
        file: "welcome-email.tsx",
        route: null,
        description: "Hoş geldin email template'i. Kullanıcı adı ile kişiselleştirilmiş, quick start linkleri, modern tasarım, responsive.",
        prompt: `Welcome email template'i eklemek istiyorum.
@templates/email-templates/PROMPT.md
WelcomeEmail template'ini src/email/welcome.tsx olarak ekler misin? Resend entegrasyonunu ve email gönderme fonksiyonunu kontrol et.`,
      },
      {
        name: "Reset Password Email",
        file: "reset-password-email.tsx",
        route: null,
        description: "Şifre sıfırlama email template'i. Reset link, güvenlik uyarısı, link expiration bilgisi.",
        prompt: `Reset password email template'i eklemek istiyorum.
@templates/email-templates/PROMPT.md
ResetPasswordEmail template'ini src/email/reset-password.tsx olarak ekler misin? Reset link ve güvenlik uyarısı içerdiğinden emin ol.`,
      },
      {
        name: "Invoice Email",
        file: "invoice-email.tsx",
        route: null,
        description: "Fatura bildirimi email template'i. Fatura detayları, PDF download link'i, payment method bilgisi.",
        prompt: `Invoice email template'i eklemek istiyorum.
@templates/email-templates/PROMPT.md
InvoiceEmail template'ini src/email/invoice.tsx olarak ekler misin? Fatura bilgileri ve PDF download link'ini kontrol et.`,
      },
      {
        name: "Subscription Email",
        file: "subscription-email.tsx",
        route: null,
        description: "Abonelik yenileme bildirimi email template'i. Yenileme bildirimi, sonraki fatura tarihi, manage subscription link'i.",
        prompt: `Subscription email template'i eklemek istiyorum.
@templates/email-templates/PROMPT.md
SubscriptionRenewedEmail template'ini src/email/subscription-renewed.tsx olarak ekler misin? Yenileme bildirimi ve manage subscription link'ini kontrol et.`,
      },
    ],
  },
  {
    id: "utilities",
    title: "Utilities & Hooks",
    description: "Validation schemas, Stripe helpers, email functions ve React hooks",
    color: "bg-cyan-500",
    icon: "ToolCase",
    templates: [
      {
        name: "Validation Schemas",
        file: "validation.ts",
        route: null,
        description: "Zod validation schemas. registerSchema (name, email, password strength), loginSchema, profileSchema (name, image), passwordSchema (currentPassword, newPassword, confirmNewPassword), settingsSchema.",
        prompt: `Validation schemas eklemek istiyorum.
@templates/utility-hook-templates/PROMPT.md
ValidationSchemas template'ini src/lib/validation.ts olarak ekler misin? Tüm Zod schema'larının doğru validate ettiğini kontrol et.`,
      },
      {
        name: "Stripe Utility",
        file: "stripe.ts",
        route: null,
        description: "Stripe helper fonksiyonları. Stripe client initialization, createCheckoutSession(), createCustomer(), cancelSubscription().",
        prompt: `Stripe utility fonksiyonları eklemek istiyorum.
@templates/utility-hook-templates/PROMPT.md
StripeUtility template'ini src/lib/stripe.ts olarak ekler misin? Helper fonksiyonlarının doğru çalıştığını kontrol et.`,
      },
      {
        name: "Email Utility",
        file: "email.ts",
        route: null,
        description: "Email gönderme helper fonksiyonları. Resend client, sendEmail() function, template renderer, sendWelcomeEmail(), sendResetPasswordEmail() fonksiyonları.",
        prompt: `Email utility fonksiyonları eklemek istiyorum.
@templates/utility-hook-templates/PROMPT.md
EmailUtility template'ini src/lib/email.ts olarak ekler misin? Resend integration'ını ve email gönderme fonksiyonlarını kontrol et.`,
      },
      {
        name: "useAuth Hook",
        file: "use-auth.ts",
        route: null,
        description: "Auth state management hook'u. useSession() kullanarak session, user, isLoading, isAuthenticated, isAdmin state'lerini döner. update() fonksiyonu.",
        prompt: `useAuth hook eklemek istiyorum.
@templates/utility-hook-templates/PROMPT.md
useAuth hook'unu src/hooks/use-auth.ts olarak ekler misin? Session state yönetiminin doğru çalıştığını kontrol et.`,
      },
      {
        name: "useUser Hook",
        file: "use-user.ts",
        route: null,
        description: "Kullanıcı verisi fetching hook'u. useQuery kullanarak user fetching, mutations (update, delete), loading states.",
        prompt: `useUser hook eklemek istiyorum.
@templates/utility-hook-templates/PROMPT.md
useUser hook'unu src/hooks/use-user.ts olarak ekler misin? TanStack Query integration'ını ve mutation'larını kontrol et.`,
      },
      {
        name: "useForm Hook",
        file: "use-form.ts",
        route: null,
        description: "Form handling wrapper hook'u. react-hook-form + Zod integration, type safety, error handling, toast notifications.",
        prompt: `useForm hook eklemek istiyorum.
@templates/utility-hook-templates/PROMPT.md
useForm hook'unu src/hooks/use-form.ts olarak ekler misin? React Hook Form ve Zod integration'ını kontrol et.`,
      },
    ],
  },
  {
    id: "ui-components",
    title: "UI Components",
    description: "Dashboard için özel UI component'leri",
    color: "bg-indigo-500",
    icon: "Box",
    templates: [
      {
        name: "StatCard",
        file: "stat-card.tsx",
        route: null,
        description: "İstatistik kartı component'i. Icon (Lucide), title, value, trend (up/down/neutral), description. Farklı icon'lar ve trend göstergeleri ile kullanılabilir.",
        prompt: `StatCard component'i eklemek istiyorum.
@templates/ui-component-templates/PROMPT.md
StatCard component'ini src/components/dashboard/stat-card.tsx olarak ekler misin? Icon ve trend props'larının doğru çalıştığını kontrol et.`,
      },
      {
        name: "DataTable",
        file: "data-table.tsx",
        route: null,
        description: "Veri tablosu component'i. TanStack Table ile columns, data, pagination, sorting, filtering, bulk actions. Server ve client component uyumlu.",
        prompt: `DataTable component'i eklemek istiyorum.
@templates/ui-component-templates/PROMPT.md
DataTable component'ini src/components/dashboard/data-table.tsx olarak ekler misin? Pagination, sorting ve filtering özelliklerini kontrol et.`,
      },
      {
        name: "EmptyState",
        file: "empty-state.tsx",
        route: null,
        description: "Boş durum gösterimi component'i. Icon, title, description, action button. Kullanıcıya rehberlik mesajları göstermek için.",
        prompt: `EmptyState component'i eklemek istiyorum.
@templates/ui-component-templates/PROMPT.md
EmptyState component'ini src/components/empty-state.tsx olarak ekler misin? Icon ve action button props'larını kontrol et.`,
      },
      {
        name: "Loading Spinner",
        file: "loading-spinner.tsx",
        route: null,
        description: "Yükleme animasyonu component'i. Spinner animation, full page ve inline variants. Loading state'leri için kullanışlı.",
        prompt: `LoadingSpinner component'i eklemek istiyorum.
@templates/ui-component-templates/PROMPT.md
LoadingSpinner component'ini src/components/loading-spinner.tsx olarak ekler misin? Full page ve inline variant'larını kontrol et.`,
      },
      {
        name: "Error Alert",
        file: "error-alert.tsx",
        route: null,
        description: "Hata bildirimi component'i. Error message, retry button, dismiss. Destructive (kırmızı) ve warning (sarı) variant'ları.",
        prompt: `ErrorAlert component'i eklemek istiyorum.
@templates/ui-component-templates/PROMPT.md
ErrorAlert component'ini src/components/error-alert.tsx olarak ekler misin? Variant'larına ve retry button functionality'sini kontrol et.`,
      },
    ],
  },
];

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("core-auth");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showPromptDialog, setShowPromptDialog] = useState(false);

  // Template sayısı
  const totalTemplates = templateCategories.reduce(
    (acc, cat) => acc + cat.templates.length,
    0
  );

  // Copy to clipboard function
  const copyToClipboard = async (text: string, id: string) => {
    if (typeof window === "undefined" || typeof navigator.clipboard === "undefined") {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Kopyalama başarısız:", err);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Ana Sayfa
          </Link>
        </Button>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-sm font-medium">{totalTemplates} Hazır Template</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4">
            Template Şablonları
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Production-ready template'ler ve AI agent prompt'ları. Her template tek tıkla kullanıma hazır.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-12">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FileCode className="h-5 w-5 text-blue-500" />
                Hazır Template'ler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                33 production-ready template. Her biri AI agent uyumlu şekilde dokümante edilmiştir.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Settings className="h-5 w-5 text-purple-500" />
                AI Agent Prompt'ları
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Her template için tek tıkla kopyalanabilir AI agent prompt şablonları.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                Production Ready
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Her template error handling, validation ve security ile birlikte gelir.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Templates */}
        <div className="space-y-8">
          {templateCategories.map((category) => (
            <Card
              key={category.id}
              className={selectedCategory === category.id ? "ring-2 ring-primary" : ""}
            >
              <CardHeader className="cursor-pointer"
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-lg ${category.color} text-white`}>
                    <span className="text-2xl">{Icons[category.icon as keyof typeof Icons]()}</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">{category.title}</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {category.description}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-lg px-4 py-1">
                    {category.templates.length} Templates
                  </Badge>
                </div>
              </CardHeader>

              {selectedCategory === category.id && (
                <CardContent className="pt-6 space-y-6">
                  {category.templates.map((template, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-lg border bg-card hover:bg-muted/50 transition"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            {template.name}
                            {template.route && (
                              <Badge variant="outline" className="text-xs">
                                {template.route}
                              </Badge>
                            )}
                          </h3>
                          <p className="text-sm text-muted-font-mono mt-1">
                            {template.file}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-4">
                        {template.description}
                      </p>

                      {/* Prompt */}
                      <div className="bg-muted rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <Badge variant="outline" className="mt-1">
                            AI Agent Prompt
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 px-2"
                            onClick={() => copyToClipboard(template.prompt, `${category.id}-${index}`)}
                            title="Kopyala"
                          >
                            {copiedId === `${category.id}-${index}` ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        <code
                          className="text-xs flex-1 bg-background p-3 rounded block whitespace-pre-wrap cursor-pointer hover:bg-muted/80 transition"
                          onClick={() => copyToClipboard(template.prompt, `${category.id}-${index}`)}
                        >
                          {template.prompt}
                        </code>
                      </div>

                      {/* File Path */}
                      <div className="text-xs text-muted-foreground">
                        📂 <code>templates/{category.id}/{template.file}</code>
                      </div>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* AI Agent Info */}
        <Card className="mt-12 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-purple-500" />
              AI Agent ile Kullanım
            </CardTitle>
            <CardDescription>
              Claude Code, GitHub Copilot veya Cursor kullanarak template'leri projenize entegre edin
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              Her template'de hazırlanmış prompt şablonunu kopyalayın, AI agent prompt'unu olarak kullanın:
            </p>
            <div className="p-4 rounded-lg bg-background border">
              <code className="text-sm">
                {`@templates/PROMPT.md
Dashboard home sayfasını eklemek istiyorum.

AI agent otomatik olarak:
- Gerekli template'i bulur
- Projenize entegre eder
- Bağımlılıkları ekler
- Kurulum adımlarını takip eder`}
              </code>
            </div>
            <Dialog open={showPromptDialog} onOpenChange={setShowPromptDialog}>
              <DialogTrigger asChild>
                <Button className="w-full" variant="outline">
                  <FileCode className="h-4 w-4 mr-2" />
                  Tüm PROMPT.md'yi Görüntüle
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Vibe Coding Starter - Template Sistemi</DialogTitle>
                  <DialogDescription>
                    AI agentlar için tam sistem rehberi ve kullanım talimatları
                  </DialogDescription>
                </DialogHeader>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <h3 className="text-lg font-semibold mb-2">🎯 Sistem Nedir?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Vibe Coding Starter, kullanıcıların fork'layıp hemen kullanabileceği hazır bir SaaS/Admin Panel starter template paketidir.
                  </p>

                  <h3 className="text-lg font-semibold mb-2">📁 Template Klasör Yapısı</h3>
                  <ul className="text-sm space-y-1 mb-4">
                    <li><strong>core-auth-templates/</strong> - Login/Register sayfaları, middleware</li>
                    <li><strong>dashboard-layout-templates/</strong> - Navbar, sidebar, user menu</li>
                    <li><strong>dashboard-page-templates/</strong> - Dashboard home, profile, settings, billing, admin</li>
                    <li><strong>api-route-templates/</strong> - User, profile, password, Stripe API'leri</li>
                    <li><strong>database-schema-templates/</strong> - Prisma schema eklemeleri</li>
                    <li><strong>email-templates/</strong> - React Email template'leri</li>
                    <li><strong>utility-hook-templates/</strong> - Validation, helpers, hooks</li>
                    <li><strong>ui-component-templates/</strong> - Özel UI component'leri</li>
                  </ul>

                  <h3 className="text-lg font-semibold mb-2">🤖 AI Agent İçin Kullanım</h3>
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <p className="text-sm"><strong>Adım 1:</strong> İlgili template kategorisini belirle</p>
                    <p className="text-sm"><strong>Adım 2:</strong> Kategorinin PROMPT.md dosyasını oku</p>
                    <p className="text-sm"><strong>Adım 3:</strong> Template dosyalarını projeye entegre et</p>
                    <p className="text-sm"><strong>Adım 4:</strong> Kullanıcı ihtiyacına göre customizasyon yap</p>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 mt-4">✅ AI Agent Kuralları</h3>
                  <div className="space-y-2 text-sm">
                    <p>✅ Template'in amacını anla</p>
                    <p>✅ Kullanıcıya rehberlik et</p>
                    <p>✅ Customization yap</p>
                    <p>✅ Best practice'leri koru</p>
                    <p>✅ Type safety ve security'i koru</p>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg mt-4">
                    <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-500">⚠️ Önemli</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Core functionality (security, validation, error handling) asla kaldırılmamalı!
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
