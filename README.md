# Vibe Coding Starter

Next.js 16, TypeScript ve üretim seviyesinde uygulamalar geliştirmek için ihtiyacınız olan tüm araçlarla hızlı geliştirme için modern bir full-stack başlangıç kiti.

## Teknoloji Yığını

- **Framework:** Next.js 16 (App Router, Server Components, Turbopack)
- **Dil:** TypeScript
- **Stil:** Tailwind CSS 4 + shadcn/ui
- **Veritabanı:** PostgreSQL ile Prisma ORM
- **Kimlik Doğrulama:** NextAuth.js ile Prisma Adapter
- **Backend:** Supabase
- **Ödemeler:** Stripe
- **E-posta:** React Email + Resend
- **Formlar:** React Hook Form + Zod doğrulama
- **UI:** Framer Motion, Lucide Icons, Sonner (bildirimler)
- **Veri:** TanStack Query, Recharts
- **Güvenlik:** reCAPTCHA v3

## Başlarken

### Ön Gereksinimler

- Node.js 18+
- PostgreSQL veritabanı (veya Supabase hesabı)
- Stripe hesabı (ödemeler için)
- Resend hesabı (e-postalar için)

### Kurulum

1. Depoyu klonlayın:

```bash
git clone https://github.com/eyaprak/vibe-coding-starter.git
cd vibe-coding-starter
```

2. **Öncelikle template kurulum scriptini çalıştırın** (şablon dosyalarını temizler):

```bash
npm run setup
```

3. Bağımlılıkları yükleyin:

```bash
npm install
```

4. Ortam değişkenleri dosyasını kopyalayın:

```bash
cp .env.example .env
```

5. `.env` dosyasında ortam değişkenlerinizi yapılandırın:
   - Veritabanı URL'i (Supabase PostgreSQL)
   - Supabase kimlik bilgileri
   - NextAuth gizli anahtarı
   - Stripe anahtarları
   - Resend API anahtarı
   - reCAPTCHA anahtarları

6. Veritabanı şemasını gönderin:

```bash
npm run db:push
```

7. Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

Uygulamanızı görmek için [http://localhost:3000](http://localhost:3000) adresini açın.

## Proje Yapısı

```
├── prisma/
│   └── schema.prisma        # Veritabanı şeması
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/             # API rotaları
│   │   ├── (dashboard)/     # Dashboard rota grubu
│   │   ├── layout.tsx       # Ana layout
│   │   └── page.tsx         # Ana sayfa
│   ├── components/
│   │   └── ui/              # shadcn/ui bileşenleri
│   ├── hooks/               # Özel React hook'ları
│   ├── lib/                 # Yardımcı fonksiyonlar ve yapılandırmalar
│   │   ├── auth.ts          # NextAuth yapılandırması
│   │   ├── prisma.ts        # Prisma client
│   │   ├── supabase.ts      # Supabase client
│   │   └── utils.ts         # Yardımcı fonksiyonlar
│   └── types/               # TypeScript tipleri
└── public/                  # Statik dosyalar
```

## Kullanılabilir Komutlar

| Komut                 | Açıklama                                   |
| --------------------- | ------------------------------------------ |
| `npm run setup`       | Template dosyalarını temizle (ilk kurulum) |
| `npm run dev`         | Turbopack ile geliştirme sunucusunu başlat |
| `npm run build`       | Üretim için derle                          |
| `npm run start`       | Üretim sunucusunu başlat                   |
| `npm run lint`        | ESLint'i çalıştır                          |
| `npm run db:push`     | Prisma şemasını veritabanına gönder        |
| `npm run db:generate` | Prisma client'ı oluştur                    |

## Özellikler

### Kimlik Doğrulama

- Kimlik bilgisi tabanlı kimlik doğrulama
- JWT ile oturum yönetimi
- Korumalı rotalar hazır

### Veritabanı

- Roller ile kullanıcı modeli (USER, ADMIN)
- OAuth için hesap bağlama
- Oturum yönetimi

### Ödemeler (Stripe)

- Client ve server SDK hazır
- Webhook işleme kurulumu

### E-posta

- React Email bileşenleri
- Resend entegrasyonu

### UI Bileşenleri

- Button, Input, Card bileşenleri
- Karanlık mod desteği
- Bildirim mesajları

## Özelleştirme

### shadcn/ui Bileşenleri Ekleme

```bash
npx shadcn@latest add [bileşen-adı]
```

### Veritabanı Migrasyonları

`prisma/schema.prisma` dosyasını değiştirdikten sonra:

```bash
npx prisma db push
```

## Dağıtım

### Vercel (Önerilen)

1. GitHub'a gönderin
2. Vercel'de projeyi içe aktarın
3. Ortam değişkenlerini yapılandırın
4. Dağıtın

### Diğer Platformlar

Üretim paketini derleyin:

```bash
npm run build
npm run start
```

## Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen bir issue açın veya pull request gönderin.

## Lisans

MIT Lisansı - bu starter'ı herhangi bir proje için kullanmakta özgürsünüz.
