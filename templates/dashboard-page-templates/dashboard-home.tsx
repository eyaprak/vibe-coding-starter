/**
 * ============================================
 * TEMPLATE: Dashboard Home Page
 * ============================================
 *
 * Dashboard ana sayfası template'i.
 *
 * Özellikler:
 * - ✅ Hoş geldin mesajı
 * - ✅ StatCard component'leri
 * - ✅ Quick actions
 * - ✅ Son aktiviteler listesi
 *
 * Kurulum: src/app/(dashboard)/page.tsx
 *
 * @see templates/dashboard-page-templates/PROMPT.md
 * ============================================
 */

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  LayoutDashboard,
  User,
  CreditCard,
  Activity,
} from "lucide-react";

export default async function DashboardHomePage() {
  const session = await getServerSession(authOptions);

  // Demo data - gerçek uygulamada API'den gelecek
  const stats = [
    {
      title: "Toplam Kullanıcı",
      value: "1,234",
      description: "Geçen aydan +12%",
      icon: User,
      trend: "up" as const,
    },
    {
      title: "Aktivite",
      value: "8,432",
      description: "Son 7 günde",
      icon: Activity,
      trend: "up" as const,
    },
    {
      title: "Gelir",
      value: "$12,345",
      description: "Bu ay",
      icon: CreditCard,
      trend: "down" as const,
    },
  ];

  const recentActivities = [
    { id: 1, action: "Yeni kullanıcı kaydı", time: "5 dakika önce" },
    { id: 2, action: "Abonelik yenilendi", time: "1 saat önce" },
    { id: 3, action: "Fatura ödendi", time: "2 saat önce" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Hoş Geldin, {session?.user?.name || "Kullanıcı"}!
        </h1>
        <p className="text-muted-foreground mt-2">
          Dashboard'ınızın özetine hoş geldiniz.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions & Recent Activities */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Quick Actions */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Hızlı İşlemler</h2>
          <div className="space-y-2">
            <a
              href="/dashboard/profile"
              className="block p-3 rounded-lg hover:bg-muted transition"
            >
              Profil Düzenle
            </a>
            <a
              href="/dashboard/billing"
              className="block p-3 rounded-lg hover:bg-muted transition"
            >
              Abonelik Yükselt
            </a>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Son Aktiviteler</h2>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between">
                <span className="text-sm">{activity.action}</span>
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
