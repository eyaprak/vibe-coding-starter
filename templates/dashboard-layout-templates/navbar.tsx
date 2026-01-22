/**
 * ============================================
 * TEMPLATE: Dashboard Navbar
 * ============================================
 *
 * Dashboard navigation bar component'i.
 *
 * Özellikler:
 * - ✅ Logo/branding
 * - ✅ Mobil menu toggle
 * - ✅ UserMenu (sağ taraf)
 * - ✅ Sticky positioning
 * - ✅ Blur effect
 * - ✅ Responsive
 *
 * Kurulum: src/components/dashboard/navbar.tsx
 *
 * @see templates/dashboard-layout-templates/PROMPT.md
 * ============================================
 */

"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserMenu } from "./user-menu";

interface DashboardNavbarProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function DashboardNavbar({ user }: DashboardNavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 lg:px-6">
        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden mr-2"
          // Mobile menu'yi aç (Sheet component)
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo */}
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">V</span>
          </div>
          <span className="font-bold text-lg hidden sm:inline-block">
            Vibe Starter
          </span>
        </Link>

        {/* Spacer */}
        <div className="ml-auto flex items-center space-x-4">
          {/* User Menu */}
          <UserMenu user={user} />
        </div>
      </div>
    </nav>
  );
}
