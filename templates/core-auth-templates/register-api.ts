/**
 * ============================================
 * TEMPLATE: Register API Route
 * ============================================
 *
 * Açıklama: Kullanıcı kayıt API endpoint'i.
 *
 * Özellikler:
 * - ✅ POST /api/register endpoint
 * - ✅ Email duplicate check
 * - ✅ Password hash (bcryptjs)
 * - ✅ User creation (Prisma)
 * - ✅ Error handling
 * - ✅ Validation
 *
 * Kurulum:
 * 1. Bu dosyayı src/app/api/register/route.ts olarak kopyalayın
 * 2. Prisma User model kontrol edin (email, name, password, role field'ları)
 * 3. bcryptjs paketi kurulu olmalı
 * 4. Prisma client (@/lib/prisma) doğru ayarlanmış olmalı
 *
 * Hedef Yol: src/app/api/register/route.ts
 *
 * Environment Variables:
 * - DATABASE_URL (Prisma için gerekli)
 *
 * @see templates/core-auth-templates/PROMPT.md
 * ============================================
 */

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/register
 *
 * Kullanıcı kaydı için endpoint.
 *
 * Request Body:
 * {
 *   "name": string,
 *   "email": string,
 *   "password": string
 * }
 *
 * Success Response (201):
 * {
 *   "user": {
 *     "id": string,
 *     "name": string,
 *     "email": string,
 *     "role": string
 *   }
 * }
 *
 * Error Response (400/500):
 * {
 *   "error": string
 * }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Eksik bilgi" },
        { status: 400 }
      );
    }

    if (typeof name !== "string" || name.length < 2) {
      return NextResponse.json(
        { error: "İsim en az 2 karakter olmalı" },
        { status: 400 }
      );
    }

    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Geçersiz email adresi" },
        { status: 400 }
      );
    }

    if (typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { error: "Şifre en az 8 karakter olmalı" },
        { status: 400 }
      );
    }

    // Email duplicate check
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Bu email adresi zaten kullanımda" },
        { status: 400 }
      );
    }

    // Password hash
    const hashedPassword = await bcrypt.hash(password, 12);

    // User creation
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase(),
        password: hashedPassword,
        role: "USER", // Default role
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);

    return NextResponse.json(
      { error: "Kayıt sırasında bir hata oluştu" },
      { status: 500 }
    );
  }
}

// OPTIONS method for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
