/**
 * ============================================
 * TEMPLATE: Password API Route
 * ============================================
 *
 * Şifre değiştirme API endpoint'i.
 *
 * Özellikler:
 * - ✅ PUT /api/user/password - Şifre değiştirme
 * - ✅ Mevcut şifre kontrolü
 * - ✅ Yeni şifre hash'leme
 *
 * Kurulum: src/app/api/user/password/route.ts
 *
 * @see templates/api-route-templates/PROMPT.md
 * ============================================
 */

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { passwordSchema } from "@/lib/validation";

/**
 * PUT /api/user/password
 *
 * Mevcut kullanıcının şifresini değiştirir.
 *
 * Request Body:
 * {
 *   "currentPassword": string,
 *   "newPassword": string
 * }
 */
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    // Validation
    const validatedData = passwordSchema.parse(body);

    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Mevcut şifre hatalı" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update password
    await prisma.user.update({
      where: { id: session.user.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Password PUT error:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
