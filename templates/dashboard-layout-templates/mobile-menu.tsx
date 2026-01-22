/**
 * ============================================
 * TEMPLATE: Mobile Menu
 * ============================================
 *
 * Dashboard mobile menu component'i.
 *
 * Özellikler:
 * - ✅ Sheet (drawer) component
 * - ✅ Sidebar ile aynı linkler
 * - ✅ Full height mobile menu
 * - ✅ Close button
 *
 * Kurulum: src/components/dashboard/mobile-menu.tsx
 *
 * @see templates/dashboard-layout-templates/PROMPT.md
 * ============================================
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  adminOnly?: boolean;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Menu,
  },
  {
    title: "Profil",
    href: "/dashboard/profile",
    icon: X,
  },
  {
    title: "Ayarlar",
    href: "/dashboard/settings",
    icon: Menu,
  },
  {
    title: "Faturalar",
    href: "/dashboard/billing",
    icon: Menu,
  },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  // Close sheet on navigation
  const handleNavClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Menü</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col space-y-1 p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            );
          })}

          {isAdmin && (
            <Link
              href="/dashboard/admin"
              onClick={handleNavClick}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === "/dashboard/admin"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <X className="h-5 w-5" />
              <span>Admin Paneli</span>
            </Link>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
