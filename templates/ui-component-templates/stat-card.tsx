/**
 * ============================================
 * TEMPLATE: Stat Card Component
 * ============================================
 *
 * İstatistik kartı component'i.
 *
 * Özellikler:
 * - ✅ Icon
 * - ✅ Title
 * - ✅ Value
 * - ✅ Trend (up/down)
 * - ✅ Description
 *
 * Kurulum: src/components/dashboard/stat-card.tsx
 *
 * @see templates/ui-component-templates/PROMPT.md
 * ============================================
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  trend: "up" | "down" | "neutral";
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
          <span
            className={cn(
              "font-medium",
              trend === "up" && "text-green-600",
              trend === "down" && "text-red-600"
            )}
          >
            {trend === "up" && "↑"}
            {trend === "down" && "↓"}
            {trend === "neutral" && "-"}
          </span>
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
