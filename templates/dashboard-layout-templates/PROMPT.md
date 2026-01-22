# Dashboard Layout Templates - Kullanım Talimatları

Bu klasör, **dashboard layout sistemi** için gerekli tüm template dosyalarını içerir.

## 📦 İçerik

```
dashboard-layout-templates/
├── PROMPT.md                # Bu dosya - Kullanım talimatları
├── navbar.tsx              # Dashboard navbar component'i
├── sidebar.tsx             # Dashboard sidebar component'i
├── user-menu.tsx           # User dropdown menu component'i
└── mobile-menu.tsx         # Mobile sheet menu component'i
```

## 🎯 Neyi Sağlar?

- ✅ Dashboard navigation bar (sticky + blur effect)
- ✅ Dashboard sidebar (collapsible + active link highlighting)
- ✅ User dropdown menu (avatar + actions)
- ✅ Mobile responsive menu (Sheet component)
- ✅ Theme-aware design (dark mode ready)

## 🚀 Kurulum Adımları

### 1. Component Klasörü Oluştur

```bash
# Dashboard component klasörünü oluştur
mkdir -p src/components/dashboard
```

### 2. Navbar Component

**Dosya:** `navbar.tsx`
**Hedef:** `src/components/dashboard/navbar.tsx`

```bash
cp templates/dashboard-layout-templates/navbar.tsx src/components/dashboard/navbar.tsx
```

**Özellikler:**
- Logo/branding
- Mobil menu toggle button
- Sağ taraf: UserMenu component
- Sticky positioning
- Blur effect (backdrop-filter)
- Responsive

**Gereksinimler:**
- ✅ UserMenu component (aynı klasörde)
- ✅ next/link
- ✅ lucide-react icons
- ✅ useSession hook (NextAuth)

### 3. Sidebar Component

**Dosya:** `sidebar.tsx`
**Hedef:** `src/components/dashboard/sidebar.tsx`

```bash
cp templates/dashboard-layout-templates/sidebar.tsx src/components/dashboard/sidebar.tsx
```

**Özellikler:**
- Navigation linkleri (Dashboard, Profil, Ayarlar, Faturalar)
- Aktif link highlighting
- Collapsible (desktop)
- Hidden on mobile (mobile sheet kullanır)
- User role-based links (admin linkleri)

**Gereksinimler:**
- ✅ next/link
- ✅ usePathname hook
- ✅ lucide-react icons
- ✅ useSession hook (NextAuth)

### 4. UserMenu Component

**Dosya:** `user-menu.tsx`
**Hedef:** `src/components/dashboard/user-menu.tsx`

```bash
cp templates/dashboard-layout-templates/user-menu.tsx src/components/dashboard/user-menu.tsx
```

**Özellikler:**
- Avatar (initials veya image)
- Dropdown menü:
  - Profil
  - Ayarlar
  - Faturalar
  - Çıkış Yap
- Logout confirm dialog
- User name ve email gösterimi

**Gereksinimler:**
- ✅ shadcn/ui components: `Avatar`, `DropdownMenu`, `Dialog`
- ✅ signOut function (NextAuth)
- ✅ useRouter (Next.js)

### 5. Mobile Menu Component

**Dosya:** `mobile-menu.tsx`
**Hedef:** `src/components/dashboard/mobile-menu.tsx`

```bash
cp templates/dashboard-layout-templates/mobile-menu.tsx src/components/dashboard/mobile-menu.tsx
```

**Özellikler:**
- Sheet (drawer) component
- Hamburger icon ile açılır
- Sidebar ile aynı linkler
- Full height mobile menu
- Close button

**Gereksinimler:**
- ✅ shadcn/ui Sheet component
- ✅ useState hook
- ✅ Navigation items (sidebar ile aynı)

## 📋 Gerekli Bağımlılıklar

```bash
# shadcn/ui components (zaten ekli olmalı)
npx shadcn@latest add avatar dropdown-menu sheet separator

# Icons (lucide-react - zaten kurulu)
# Next.js hooks (zaten mevcut)
```

## 🔧 Dashboard Layout Entegrasyonu

Bu component'leri dashboard layout'a entegre etmek için:

**Dosya:** `src/app/(dashboard)/layout.tsx`

```tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import { DashboardNavbar } from "@/components/dashboard/navbar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <DashboardNavbar user={session.user} />

      <div className="flex">
        {/* Sidebar - Desktop */}
        <DashboardSidebar className="hidden lg:block" />

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
```

## 🎨 Customization

### Navigation Linklerini Özelleştirme

```tsx
// sidebar.tsx veya mobile-menu.tsx

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profil",
    href: "/dashboard/profile",
    icon: User,
  },
  // Custom link ekle
  {
    title: "Siparişlerim",
    href: "/dashboard/orders",
    icon: ShoppingCart,
  },
];
```

### Logo Değiştirme

```tsx
// navbar.tsx

<Link href="/dashboard" className="flex items-center space-x-2">
  <YourLogo />
  <span className="font-bold">Your Brand</span>
</Link>
```

### UserMenu Actions'ı Özelleştirme

```tsx
// user-menu.tsx

// Menüye yeni action ekle
<DropdownMenuItem>
  <Link href="/dashboard/support">Destek</Link>
</DropdownMenuItem>
```

## 🧪 Test Etme

### 1. Navbar Testi

```bash
npm run dev
# Git: http://localhost:3000/dashboard
# Navbar görünüyor mu?
# User menu çalışıyor mu?
# Mobile menu button'u var mı?
```

### 2. Sidebar Testi

```bash
# Desktop'ta sidebar görünüyor mu?
# Linklere tıklandığında aktif class'ı değişiyor mu?
# Admin linkleri sadece ADMIN rolünde görünüyor mu?
```

### 3. Mobile Menu Testi

```bash
# Browser'ı daralt (mobile view)
# Hamburger menu'ye tıkla
# Sheet açılıyor mu?
# Linkler çalışıyor mu?
```

### 4. UserMenu Testi

```bash
# Avatar'a tıkla
# Dropdown menü açılıyor mu?
// Çıkış yap butonuna tıkla
# Logout confirm dialog gösteriliyor mu?
# Çıkış yapıldıktan sonra login sayfasına yönlendiriliyor musun?
```

## 🐛 Troubleshooting

### Sorun: Navbar veya sidebar görünmüyor

**Çözüm:**
1. Dashboard layout'a component'leri import ettiğini kontrol et
2. Component yolları doğru mu kontrol et (`@/components/dashboard/...`)
3. Console'da hata var mı kontrol et

### Sorun: UserMenu avatar boş görünüyor

**Çözüm:**
1. Session'da user.name var mı kontrol et
2. Avatar component'in initials prop'u alıyor mu kontrol et

### Sorun: Sidebar linkleri aktif olmuyor

**Çözüm:**
1. usePathname hook'unu doğru kullandığını kontrol et
2. Link href'leri doğru mu kontrol et

### Sorun: Mobile menu açılmıyor

**Çözüm:**
1. Sheet component'inin shadcn/ui'dan ekli olduğunu kontrol et
2. useState isOpen state'ini doğru kullanıyor musun kontrol et
3. Sheet open prop'u bağlı mı kontrol et

## 💡 İpuçları

1. **Collapsible Sidebar**: Desktop'ta sidebar'ı collapse edilebilir yapabilirsin
2. **Breadcrumbs**: İç içe sayfalar için breadcrumbs ekleyebilirsin
3. **Search Bar**: Navbar'a global search ekleyebilirsin
4. **Notification Bell**: Navbar'a notification bell ekleyebilirsin
5. **Quick Actions**: UserMenu'ya quick actions ekleyebilirsin

## 📚 Örnek Kullanımlar

### Kullanıcı Senaryo 1: Minimum Layout

```bash
# Sadece navbar + user menu
1. navbar.tsx → src/components/dashboard/navbar.tsx
2. user-menu.tsx → src/components/dashboard/user-menu.tsx

# Sidebar olmadan, basit bir layout
```

### Kullanıcı Senaryo 2: Full Layout

```bash
# Tüm component'leri kur
1. navbar.tsx
2. sidebar.tsx
3. user-menu.tsx
4. mobile-menu.tsx

# Tam responsive, modern bir dashboard layout
```

## 🔗 İlişkili Template'ler

Bu template'leri kurduktan sonra şunları da ekleyebilirsin:

- 📄 **Dashboard Page Templates** → Dashboard sayfaları
- 📄 **UI Component Templates** → StatCard, DataTable vb.
- 📄 **API Route Templates** → User management API'leri

## 📝 Sonraki Adımlar

Layout sistemi kurulumundan sonra:

1. ✅ **Dashboard Home Page** → Ana dashboard sayfası ekle
2. ✅ **Profile Page** → Profil sayfası ekle
3. ✅ **Settings Page** → Ayarlar sayfası ekle
4. ✅ **UI Components** → StatCard, DataTable vb. ekle

---

**AI Agent İçin Not**: Kullanıcı dashboard layout ile ilgili bir istek yaptığında, bu dosyayı referans al ve ilgili template dosyalarını kullanıcıya sun.
