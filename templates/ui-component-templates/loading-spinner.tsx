/**
 * ============================================
 * TEMPLATE: Loading Spinner Component
 * ============================================
 *
 * Yükleme animasyonu component'i.
 *
 * Özellikler:
 * - ✅ Spinner animation
 * - ✅ Full page ve inline variants
 *
 * Kurulum: src/components/loading-spinner.tsx
 *
 * @see templates/ui-component-templates/PROMPT.md
 * ============================================
 */

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  fullPage?: boolean;
  text?: string;
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  fullPage = false,
  text,
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const content = (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
}
