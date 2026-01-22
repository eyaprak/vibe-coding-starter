# Core Auth Templates - Kullanım Talimatları

Bu klasör, **authentication sistemi** için gerekli tüm template dosyalarını içerir.

## 📦 İçerik

```
core-auth-templates/
├── PROMPT.md                    # Bu dosya - Kullanım talimatları
├── middleware.ts                # NextAuth middleware (route protection)
├── login-page.tsx              # Login sayfası template'i
├── register-page.tsx           # Register sayfası template'i
└── register-api.ts             # Register API route template'i
```

## 🎯 Neyi Sağlar?

- ✅ Login sayfası (email/password form + validation)
- ✅ Register sayfası (email/password/name form + validation)
- ✅ Auth middleware (route protection)
- ✅ Register API endpoint (user creation)
- ✅ NextAuth.js entegrasyonu
- ✅ Password hashing (bcrypt)
- ✅ Error handling (toast notifications)

## 🚀 Kurulum Adımları

### 1. Middleware

**Dosya:** `middleware.ts`
**Hedef:** `src/middleware.ts`

```bash
# Kopyala
cp templates/core-auth-templates/middleware.ts src/middleware.ts
```

**Açıklama:**
- Giriş yapmamış kullanıcıları `/login`'e yönlendirir
- Giriş yapmış kullanıcıları `/dashboard`'a yönlendirir
- Admin route'larını korur (`/dashboard/admin` sadece ADMIN rolünde)

**Gereksinimler:**
- ✅ NextAuth.js kurulu olmalı
- ✅ User modelinde `role` field olmalı

### 2. Login Page

**Dosya:** `login-page.tsx`
**Hedef:** `src/app/login/page.tsx`

```bash
# Klasörü oluştur ve kopyala
mkdir -p src/app/login
cp templates/core-auth-templates/login-page.tsx src/app/login/page.tsx
```

**Açıklama:**
- Email/password formu
- Zod validation
- NextAuth `signIn()` çağrısı
- Error handling (toast)
- "Şifremi unuttum" linki
- "Kayıt ol" linki

**Gereksinimler:**
- ✅ shadcn/ui components: `Button`, `Input`, `Label`, `Form`
- ✅ `sonner` (toast notifications)
- ✅ `react-hook-form` + `@hookform/resolvers/zod`
- ✅ NextAuth.js configuration (`@/lib/auth`)

### 3. Register Page

**Dosya:** `register-page.tsx`
**Hedef:** `src/app/register/page.tsx`

```bash
# Klasörü oluştur ve kopyala
mkdir -p src/app/register
cp templates/core-auth-templates/register-page.tsx src/app/register/page.tsx
```

**Açıklama:**
- Name, email, password formu
- Password strength indicator
- Zod validation
- API call to `/api/register`
- Başarılı ise otomatik giriş

**Gereksinimler:**
- ✅ Login page ile aynı bağımlılıklar
- ✅ Register API route (`/api/register`)
- ✅ NextAuth.js configuration

### 4. Register API

**Dosya:** `register-api.ts`
**Hedef:** `src/app/api/register/route.ts`

```bash
# Klasörü oluştur ve kopyala
mkdir -p src/app/api/register
cp templates/core-auth-templates/register-api.ts src/app/api/register/route.ts
```

**Açıklama:**
- POST endpoint
- Email duplicate check
- Password hash (bcryptjs)
- User create (Prisma)
- NextAuth credentials provider

**Gereksinimler:**
- ✅ Prisma User model
- ✅ bcryptjs paketi
- ✅ NextAuth.js configuration

## 📋 Gerekli Bağımlılıklar

```bash
# Zaten kurulu olmalı (package.json kontrol edin)
npm install next-auth bcryptjs zod react-hook-form @hookform/resolvers
npm install sonner  # Toast notifications
```

```bash
# shadcn/ui components (zaten ekli olmalı)
npx shadcn@latest add button input label form
```

## 🔧 Environment Variables

`.env` dosyasına ekleyin (zaten mevcut olmalı):

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Database (Prisma)
DATABASE_URL=your-database-url
DIRECT_URL=your-direct-database-url
```

## 🧪 Test Etme

### 1. Login Testi

```bash
# Dev server'ı başlat
npm run dev

# Git
http://localhost:3000/login

# Test et:
# 1. Önce bir kullanıcı oluştur (Prisma Studio veya manuel)
# 2. Email ve password gir
# 3. Login butonuna tıkla
# 4. Dashboard'a yönlendirilmelisin
```

### 2. Register Testi

```bash
# Git
http://localhost:3000/register

# Test et:
# 1. Formu doldur (name, email, password)
# 2. Password strength indicator'ı gör
# 3. Register butonuna tıkla
# 4. Başarılı mesajı gör (toast)
# 5. Dashboard'a yönlendirilmelisin
```

### 3. Middleware Testi

```bash
# Test 1: Giriş yapmadan /dashboard'a git
http://localhost:3000/dashboard
# → /login'e yönlendirilmelisin

# Test 2: Giriş yapmışken /login'e git
http://localhost:3000/login
# → /dashboard'a yönlendirilmelisin
```

## 🎨 Customization

### Login Sayfasını Özelleştirme

```tsx
// src/app/login/page.tsx

// Logo değiştirme
<Link href="/">
  <YourLogo />  {/* Buraya kendi logonu koy */}
</Link>

// Başlığı değiştirme
<CardTitle className="text-2xl">Giriş Yap</CardTitle>

// Footer linklerini değiştirme
<Link href="/forgot-password">Şifremi Unuttum</Link>
```

### Register Validasyonunu Değiştirme

```typescript
// Zod schema'yı özelleştir
const registerSchema = z.object({
  name: z.string().min(3, "En az 3 karakter"),
  email: z.string().email("Geçersiz email"),
  password: z.string().min(8, "En az 8 karakter"),
  // Custom field ekle
  phone: z.string().optional(),
});
```

## 🔗 İlişkili Template'ler

Bu template'leri kurdıktan sonra şunları da ekleyebilirsin:

- 📄 **Dashboard Layout Templates** → Dashboard navigation ve layout
- 📄 **Dashboard Page Templates** → Dashboard sayfaları
- 📄 **Utility & Hook Templates** → Validation schemas ve hooks

## 🐛 Troubleshooting

### Sorun: "Invalid credentials" hatası

**Çözüm:**
1. Database'de kullanıcı var mı kontrol et (Prisma Studio)
2. Password hash'li mi kontrol et
3. Email doğru mu kontrol et

### Sorun: Middleware çalışmıyor

**Çözüm:**
1. `src/middleware.ts` dosyası root'ta mı kontrol et
2. NextAuth configuration doğru mu kontrol et
3. `matcher` config'i kontrol et

### Sorun: Register API 500 hatası

**Çözüm:**
1. Prisma User model kontrol et
2. Password field'ı var mı kontrol et
3. Database bağlantısı test et

## 📚 Örnek Kullanımlar

### Kullanıcı Senaryo 1: Sadece Login İstiyorum

```bash
# Minimum kurulum:
1. middleware.ts → src/middleware.ts
2. login-page.tsx → src/app/login/page.tsx

# Register'a ihtiyacın yoksa, kullanıcıları manuel ekleyebilirsin
```

### Kullanıcı Senaryo 2: Full Auth Sistemi

```bash
# Tüm dosyaları kur:
1. middleware.ts → src/middleware.ts
2. login-page.tsx → src/app/login/page.tsx
3. register-page.tsx → src/app/register/page.tsx
4. register-api.ts → src/app/api/register/route.ts

# Şimdi tam bir auth sistemine sahipsin!
```

## 💡 İpuçları

1. **Password Strength**: Zod validation'da regex kullanarak güçlü şifre zorunluluğu ekleyebilirsin
2. **Email Verification**: Register sonrası email verification ekleyebilirsin
3. **OAuth Providers**: Google, GitHub vb. OAuth provider'lar ekleyebilirsin
4. **2FA**: Two-factor authentication ekleyebilirsin
5. **Rate Limiting**: Brute force koruması için rate limiting ekleyebilirsin

## 📝 Sonraki Adımlar

Auth sistemi kurulumundan sonra:

1. ✅ **Dashboard Layout** → Navigation ve sidebar ekle
2. ✅ **Dashboard Pages** → Home, profile, settings sayfaları ekle
3. ✅ **API Routes** → User management API'leri ekle
4. ✅ **Database Extensions** → Subscription, invoice modelleri ekle

---

**AI Agent İçin Not**: Kullanıcı auth sistemi ile ilgili bir istek yaptığında, bu dosyayı referans al ve ilgili template dosyalarını kullanıcıya sun.
