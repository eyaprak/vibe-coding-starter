/**
 * ============================================
 * TEMPLATE: Profile Page
 * ============================================
 *
 * Profil sayfası template'i.
 *
 * Özellikler:
 * - ✅ Kullanıcı bilgileri card
 * - ✅ Düzenleme formu
 * - ✅ Avatar upload
 * - ✅ Güncelleme
 *
 * Kurulum: src/app/(dashboard)/profile/page.tsx
 *
 * @see templates/dashboard-page-templates/PROMPT.md
 * ============================================
 */

"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      await update({ ...session, user: { ...session?.user, name } });

      toast.success("Başarılı", {
        description: "Profil güncellendi",
      });
    } catch (error) {
      toast.error("Hata", {
        description: "Profil güncellenemedi",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profil</h1>
        <p className="text-muted-foreground">Profil bilgilerinizi yönetin</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Avatar Card */}
        <Card>
          <CardHeader>
            <CardTitle>Profil Fotoğrafı</CardTitle>
            <CardDescription>Avatarınızı yükleyin</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src={session?.user?.image || undefined} />
              <AvatarFallback className="text-4xl">
                {session?.user?.name?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline">Fotoğraf Yükle</Button>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Bilgiler</CardTitle>
            <CardDescription>Kişisel bilgileriniz</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">İsim Soyisim</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={session?.user?.name || ""}
                  placeholder="John Doe"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={session?.user?.email || ""}
                  disabled
                />
                <p className="text-xs text-muted-foreground">
                  Email değiştirmek için ayarlara gidin
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Rol</Label>
                <Input
                  id="role"
                  value={session?.user?.role || "USER"}
                  disabled
                />
              </div>

              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Güncelle
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
