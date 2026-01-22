/**
 * ============================================
 * TEMPLATE: Register Page
 * ============================================
 *
 * Açıklama: Kullanıcı kayıt sayfası template'i.
 *
 * Özellikler:
 * - ✅ Name, email, password formu
 * - ✅ Password strength indicator
 * - ✅ Zod validation
 * - ✅ API call to /api/register
 * - ✅ Başarılı ise otomatik giriş
 * - ✅ Loading states
 * - ✅ Responsive design
 *
 * Kurulum:
 * 1. Bu dosyayı src/app/register/page.tsx olarak kopyalayın
 * 2. Gerekli shadcn/ui component'lerini kurun (button, input, label, form, progress)
 * 3. sonner (toast) kurun
 * 4. react-hook-form ve zod kurun
 * 5. /api/register route'unu oluşturun (register-api.ts template'ini kullanın)
 * 6. @/lib/auth configuration'ı kontrol edin
 *
 * Hedef Yol: src/app/register/page.tsx
 *
 * @see templates/core-auth-templates/PROMPT.md
 * ============================================
 */

"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Progress,
} from "@/components/ui/progress";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

// Validation schema
const registerSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalı"),
  email: z.string().email("Geçersiz email adresi"),
  password: z.string().min(8, "Şifre en az 8 karakter olmalı"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

// Password strength checker
function checkPasswordStrength(password: string) {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;

  return strength;
}

function getPasswordStrengthLabel(strength: number) {
  if (strength <= 1) return { label: "Zayıf", color: "bg-red-500", variant: "destructive" as const };
  if (strength <= 2) return { label: "Orta", color: "bg-yellow-500", variant: "default" as const };
  if (strength <= 3) return { label: "İyi", color: "bg-blue-500", variant: "default" as const };
  return { label: "Güçlü", color: "bg-green-500", variant: "default" as const };
}

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = form.watch("password");

  // Update password strength
  if (password) {
    setPasswordStrength(checkPasswordStrength(password));
  }

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);

    try {
      // Register API call
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Kayıt başarısız");
      }

      toast.success("Kayıt başarılı!", {
        description: "Giriş yapılıyor...",
      });

      // Auto login
      const signInResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signInResult?.error) {
        toast.error("Otomatik giriş başarısız", {
          description: "Lütfen manuel olarak giriş yapın",
        });
        router.push("/login");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error: any) {
      toast.error("Kayıt başarısız", {
        description: error.message || "Lütfen tekrar deneyin",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const strengthInfo = getPasswordStrengthLabel(passwordStrength);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Kayıt Ol
          </CardTitle>
          <CardDescription className="text-center">
            Hesap oluşturmak için bilgilerinizi girin
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İsim Soyisim</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ornek@email.com"
                        type="email"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Şifre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />

                    {/* Password Strength Indicator */}
                    {password && (
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center gap-2">
                          <Progress
                            value={passwordStrength * 20}
                            className="flex-1"
                          />
                          <span className="text-xs text-muted-foreground min-w-[50px]">
                            {strengthInfo.label}
                          </span>
                        </div>

                        {/* Password Requirements */}
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-1">
                            {password.length >= 8 ? (
                              <CheckCircle2 className="h-3 w-3 text-green-500" />
                            ) : (
                              <XCircle className="h-3 w-3 text-muted-foreground" />
                            )}
                            <span
                              className={
                                password.length >= 8
                                  ? "text-green-600"
                                  : "text-muted-foreground"
                              }
                            >
                              En az 8 karakter
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {/[A-Z]/.test(password) && /[a-z]/.test(password) ? (
                              <CheckCircle2 className="h-3 w-3 text-green-500" />
                            ) : (
                              <XCircle className="h-3 w-3 text-muted-foreground" />
                            )}
                            <span
                              className={
                                /[A-Z]/.test(password) && /[a-z]/.test(password)
                                  ? "text-green-600"
                                  : "text-muted-foreground"
                              }
                            >
                              Büyük ve küçük harf
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {/\d/.test(password) ? (
                              <CheckCircle2 className="h-3 w-3 text-green-500" />
                            ) : (
                              <XCircle className="h-3 w-3 text-muted-foreground" />
                            )}
                            <span
                              className={
                                /\d/.test(password)
                                  ? "text-green-600"
                                  : "text-muted-foreground"
                              }
                            >
                              Rakam (0-9)
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {/[^a-zA-Z0-9]/.test(password) ? (
                              <CheckCircle2 className="h-3 w-3 text-green-500" />
                            ) : (
                              <XCircle className="h-3 w-3 text-muted-foreground" />
                            )}
                            <span
                              className={
                                /[^a-zA-Z0-9]/.test(password)
                                  ? "text-green-600"
                                  : "text-muted-foreground"
                              }
                            >
                              Özel karakter (!@#$%^&*)
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Şifre Tekrar</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Kayıt yapılıyor...
                  </>
                ) : (
                  "Kayıt Ol"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-muted-foreground text-center">
            Zaten hesabınız var mı?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Giriş yapın
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
