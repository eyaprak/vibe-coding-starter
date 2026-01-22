/**
 * ============================================
 * TEMPLATE: Empty State Component
 * ============================================
 *
 * Boş durum gösterimi component'i.
 *
 * Özellikler:
 * - ✅ Icon
 * - ✅ Title
 * - ✅ Description
 * - ✅ Action button
 *
 * Kurulum: src/components/empty-state.tsx
 *
 * @see templates/ui-component-templates/PROMPT.md
 * ============================================
 */

import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-12", className)}>
      {Icon && (
        <div className="rounded-full bg-muted p-4 mb-4">
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground text-center max-w-md mb-6">
        {description}
      </p>
      {action && <Button onClick={action.onClick}>{action.label}</Button>}
    </div>
  );
}
