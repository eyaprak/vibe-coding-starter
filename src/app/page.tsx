import Link from "next/link";
import {
  Rocket,
  Zap,
  Shield,
  Code,
  Database,
  CreditCard,
  Mail,
  Layout,
  CheckCircle2,
  Github,
  BookOpen,
  Bot,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const features = [
    {
      icon: Rocket,
      title: "Next.js 16",
      description: "App Router, Server Components ve Turbopack ile ışık hızında geliştirme",
      color: "text-blue-500",
    },
    {
      icon: Shield,
      title: "Kimlik Doğrulama",
      description: "Prisma adaptörlü NextAuth.js. JWT sessions ve credentials provider",
      color: "text-green-500",
    },
    {
      icon: Database,
      title: "Veritabanı",
      description: "PostgreSQL/Supabase ile Prisma ORM. Tip güvenli veritabanı sorguları",
      color: "text-orange-500",
    },
    {
      icon: CreditCard,
      title: "Ödemeler",
      description: "Abonelik ve tek seferlik ödemeler için hazır Stripe entegrasyonu",
      color: "text-purple-500",
    },
    {
      icon: Mail,
      title: "E-posta",
      description: "Güzel işlemsel e-postalar için React Email ve Resend",
      color: "text-pink-500",
    },
    {
      icon: Layout,
      title: "UI Bileşenleri",
      description: "Tailwind CSS ile shadcn/ui bileşenleri. Karanlık mod dahil",
      color: "text-indigo-500",
    },
  ];

  const stats = [
    { label: "Template", value: "33+" },
    { label: "Kategori", value: "8" },
    { label: "UI Component", value: "20+" },
    { label: "Production Ready", value: "100%" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <Badge variant="secondary" className="px-4 py-2">
            <Zap className="h-4 w-4 mr-2" />
            Template Sistemi v1.0 Yayında
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Vibe Coding Starter
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Next.js 16, TypeScript, Tailwind CSS, Prisma, Supabase, Stripe ve daha fazlasıyla
            modern full-stack başlangıç kiti. 33 production-ready template ile hemen başla.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/templates">
                <Code className="h-4 w-4 mr-2" />
                Şablonları Keşfet
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://github.com/yourusername/vibe-coding-starter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/baslangic">
                <BookOpen className="h-4 w-4 mr-2" />
                Başlarken
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center">
              <CardHeader>
                <CardTitle className="text-3xl">{stat.value}</CardTitle>
                <CardDescription>{stat.label}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Teknoloji Yığını</h2>
            <p className="text-muted-foreground">
              Modern ve production-ready teknolojiler ile güçlü bir temel
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4`}>
                      <Icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Template System Section */}
        <div className="mt-20">
          <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Code className="h-6 w-6 text-purple-500" />
                Template Sistemi v1.0
              </CardTitle>
              <CardDescription className="text-base">
                33 production-ready template ile projenizi hızlandırın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-semibold">AI Agent Uyumlu</p>
                    <p className="text-sm text-muted-foreground">
                      Claude Code, Cursor ve Copilot ile çalışır
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-semibold">Hazır Prompt Şablonları</p>
                    <p className="text-sm text-muted-foreground">
                      Her template için kopyalanabilir AI agent prompt'ları
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-semibold">8 Kategori</p>
                    <p className="text-sm text-muted-foreground">
                      Auth, Dashboard, API, Database, Email, Utility ve UI
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-semibold">Production Ready</p>
                    <p className="text-sm text-muted-foreground">
                      Error handling, validation ve security dahil
                    </p>
                  </div>
                </div>
              </div>
              <Button asChild className="w-full" size="lg">
                <Link href="/templates">
                  <Code className="h-4 w-4 mr-2" />
                  Tüm Template'leri Görüntüle
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Start Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Hızlı Başlangıç</h2>
            <p className="text-muted-foreground">
              Sadece 3 adımda projenizi hazırlayın
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                  1
                </div>
                <CardTitle>Kurulum</CardTitle>
                <CardDescription>
                  Projeyi klonlayın ve bağımlılıkları yükleyin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <code className="text-sm bg-muted p-2 rounded block">
                  npm install
                </code>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                  2
                </div>
                <CardTitle>Veritabanı</CardTitle>
                <CardDescription>
                  .env dosyasını yapılandırın ve veritabanını başlatın
                </CardDescription>
              </CardHeader>
              <CardContent>
                <code className="text-sm bg-muted p-2 rounded block">
                  npm run db:push
                </code>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                  3
                </div>
                <CardTitle>Başlat</CardTitle>
                <CardDescription>
                  Geliştirme sunucusunu başlatın ve template'leri keşfedin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <code className="text-sm bg-muted p-2 rounded block">
                  npm run dev
                </code>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* v1.1 Section */}
        <div className="mt-20 border-t pt-20">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              v1.1 Yeni Güncellemeler
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Template Sistemi v1.0</h2>
            <p className="text-muted-foreground">
              Production-ready template'ler ve AI agent entegrasyonu ile projenizi hızlandırın
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle>33 Production-Ready Template</CardTitle>
                <CardDescription>
                  Her biri AI agent uyumlu, dokümante edilmiş ve kullanıma hazır template'ler
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <Bot className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle>AI Agent Uyumlu</CardTitle>
                <CardDescription>
                  Claude Code, Cursor ve GitHub Copilot ile sorunsuz çalışır
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle>Hazır Prompt Şablonları</CardTitle>
                <CardDescription>
                  Her template için tek tıkla kopyalanabilir AI agent prompt şablonları
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button asChild size="lg" variant="default">
              <Link href="/templates">
                <Code className="h-4 w-4 mr-2" />
                Tüm Template'leri İncele
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
