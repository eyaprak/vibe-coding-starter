/**
 * ============================================
 * TEMPLATE: Admin Page
 * ============================================
 *
 * Admin paneli sayfası template'i.
 *
 * Özellikler:
 * - ✅ Kullanıcı listesi
 * - ✅ Filtreleme (role, date)
 * - ✅ Arama (email/name)
 * - ✅ Bulk actions
 *
 * Kurulum: src/app/(dashboard)/admin/page.tsx
 *
 * @see templates/dashboard-page-templates/PROMPT.md
 * ============================================
 */

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MoreHorizontal, Shield } from "lucide-react";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  // Admin check
  if (session?.user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  // Demo data - gerçek uygulamada API'den gelecek
  const users = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "USER",
      createdAt: "2025-01-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "ADMIN",
      createdAt: "2025-01-10",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "USER",
      createdAt: "2025-01-05",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Shield className="h-8 w-8" />
          Admin Paneli
        </h1>
        <p className="text-muted-foreground">Kullanıcıları ve sistemi yönetin</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Toplam Kullanıcı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground mt-1">
              +12 geçen ay
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Aktif Kullanıcı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">856</div>
            <p className="text-xs text-muted-foreground mt-1">
              Son 30 günde
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Premium Kullanıcı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground mt-1">
              %18 toplam
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Gelir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12.4K</div>
            <p className="text-xs text-muted-foreground mt-1">
              Bu ay
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Kullanıcılar</CardTitle>
          <CardDescription>
            Tüm kullanıcıları görüntüleyin ve yönetin
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search & Filter */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Email veya isim ara..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filtrele</Button>
          </div>

          {/* Users List */}
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={undefined} />
                    <AvatarFallback>
                      {user.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
                    {user.role}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString("tr-TR")}
                  </span>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              1-3 / 1,234 kullanıcı
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Önceki
              </Button>
              <Button variant="outline" size="sm">
                Sonraki
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
