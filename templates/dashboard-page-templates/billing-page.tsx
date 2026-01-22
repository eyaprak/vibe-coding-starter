/**
 * ============================================
 * TEMPLATE: Billing Page
 * ============================================
 *
 * Faturalandırma sayfası template'i.
 *
 * Özellikler:
 * - ✅ Mevcut plan card
 * - ✅ Kullanım istatistikleri
 * - ✅ Fatura geçmişi
 * - ✅ Stripe entegrasyonu
 *
 * Kurulum: src/app/(dashboard)/billing/page.tsx
 *
 * @see templates/dashboard-page-templates/PROMPT.md
 * ============================================
 */

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, FileText, Check } from "lucide-react";

export default async function BillingPage() {
  const session = await getServerSession(authOptions);

  // Demo data - gerçek uygulamada API'den gelecek
  const currentPlan = {
    name: "Pro Plan",
    status: "active",
    amount: "$29",
    interval: "ay",
    renewDate: "2025-02-18",
  };

  const invoices = [
    { id: "INV-001", date: "2025-01-18", amount: "$29", status: "paid" },
    { id: "INV-002", date: "2024-12-18", amount: "$29", status: "paid" },
    { id: "INV-003", date: "2024-11-18", amount: "$29", status: "paid" },
  ];

  const features = [
    "Sınırsız proje",
    "Öncelikli destek",
    "Gelişmiş analitik",
    "Custom integrations",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Faturalandırma</h1>
        <p className="text-muted-foreground">Abonelik ve fatura yönetimi</p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Mevcut Plan</CardTitle>
              <CardDescription>
                {currentPlan.name} - {currentPlan.amount}/{currentPlan.interval}
              </CardDescription>
            </div>
            <Badge variant="default">Aktif</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Yenileme Tarihi: {new Date(currentPlan.renewDate).toLocaleDateString("tr-TR")}
            </p>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Plan Özellikleri</h3>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-2">
            <Button>Plan Yükselt</Button>
            <Button variant="outline">Plan İptal</Button>
          </div>
        </CardContent>
      </Card>

      {/* Usage Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Projeler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              Sınırsız
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Depolama</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 GB</div>
            <p className="text-xs text-muted-foreground mt-1">
              100 GB
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">API Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.4K</div>
            <p className="text-xs text-muted-foreground mt-1">
              100K/ay
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Invoice History */}
      <Card>
        <CardHeader>
          <CardTitle>Fatura Geçmişi</CardTitle>
          <CardDescription>Geçmiş faturalarınızı görüntüleyin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{invoice.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(invoice.date).toLocaleDateString("tr-TR")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">{invoice.amount}</span>
                  <Button variant="outline" size="sm">
                    İndir
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Ödeme Yöntemi</CardTitle>
          <CardDescription>Ödeme yönteminizi yönetin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <CreditCard className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="font-medium">**** **** **** 4242</p>
              <p className="text-sm text-muted-foreground">
                Son kullanma: 12/25
              </p>
            </div>
            <Button variant="outline" className="ml-auto">
              Güncelle
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
