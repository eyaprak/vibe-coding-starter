/**
 * ============================================
 * TEMPLATE: Dashboard Sidebar
 * ============================================
 *
 * Dashboard sidebar component'i.
 *
 * Özellikler:
 * - ✅ Navigation linkleri
 * - ✅ Aktif link highlighting
 * - ✅ Collapsible (desktop)
 * - ✅ Role-based links
 * - ✅ Icons
 *
 * Kurulum: src/components/dashboard/sidebar.tsx
 *
 * @see templates/dashboard-layout-templates/PROMPT.md
 * ============================================
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  User,
  Settings,
  CreditCard,
  Shield,
  Users,
} from "lucide-react";
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
    icon: LayoutDashboard,
  },
  {
    title: "Profil",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Ayarlar",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Faturalar",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    title: "Admin Paneli",
    href: "/dashboard/admin",
    icon: Shield,
    adminOnly: true,
  },
];

interface DashboardSidebarProps {
  className?: string;
}

export function DashboardSidebar({ className }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <aside
      className={cn(
        "hidden lg:flex lg:flex-col w-64 border-r bg-background",
        className
      )}
    >
      {/* Sidebar Header */}
      <div className="h-16 flex items-center px-6 border-b">
        <span className="font-semibold text-lg">Menü</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          // Admin check
          if (item.adminOnly && !isAdmin) {
            return null;
          }

          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t">
        <div className="text-xs text-muted-foreground text-center">
          Vibe Starter v1.0
        </div>
      </div>
    </aside>
  );
}
