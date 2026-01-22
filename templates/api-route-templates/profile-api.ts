/**
 * ============================================
 * TEMPLATE: Profile API Route
 * ============================================
 *
 * Profil yönetimi API endpoint'i.
 *
 * Özellikler:
 * - ✅ GET /api/user/profile - Profil bilgileri
 * - ✅ PUT /api/user/profile - Profil güncelleme
 * - ✅ Validation (Zod)
 * - ✅ Error handling
 *
 * Kurulum: src/app/api/user/profile/route.ts
 *
 * @see templates/api-route-templates/PROMPT.md
 * ============================================
 */

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { profileSchema } from "@/lib/validation";

/**
 * GET /api/user/profile
 *
 * Mevcut kullanıcının profil bilgilerini getirir.
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Profile GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/user/profile
 *
 * Mevcut kullanıcının profil bilgilerini günceller.
 *
 * Request Body:
 * {
 *   "name"?: string,
 *   "image"?: string
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

    // Validation
    const validatedData = profileSchema.parse(body);

    // Update user
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...(validatedData.name && { name: validatedData.name }),
        ...(validatedData.image !== undefined && { image: validatedData.image }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
      },
    });

    return NextResponse.json({ user });
  } catch (error: any) {
    console.error("Profile PUT error:", error);

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
