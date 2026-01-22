/**
 * ============================================
 * TEMPLATE: Error Alert Component
 * ============================================
 *
 * Hata bildirimi component'i.
 *
 * Özellikler:
 * - ✅ Hata mesajı
 * - ✅ Retry button
 * - ✅ Dismiss
 *
 * Kurulum: src/components/error-alert.tsx
 *
 * @see templates/ui-component-templates/PROMPT.md
 * ============================================
 */

"use client";

import { XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorAlertProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  variant?: "destructive" | "warning";
  className?: string;
}

export function ErrorAlert({
  title,
  message,
  onRetry,
  onDismiss,
  variant = "destructive",
  className,
}: ErrorAlertProps) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4",
        variant === "destructive"
          ? "bg-destructive/10 border-destructive text-destructive"
          : "bg-warning/10 border-warning text-warning",
        className
      )}
    >
      <div className="flex items-start gap-3">
        {variant === "destructive" ? (
          <XCircle className="h-5 w-5 mt-0.5" />
        ) : (
          <AlertCircle className="h-5 w-5 mt-0.5" />
        )}
        <div className="flex-1 space-y-1">
          {title && <p className="font-semibold">{title}</p>}
          <p className="text-sm">{message}</p>
          {onRetry && (
            <Button
              variant={variant === "destructive" ? "destructive" : "outline"}
              size="sm"
              className="mt-2"
              onClick={onRetry}
            >
              Tekrar Dene
            </Button>
          )}
        </div>
        {onDismiss && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={onDismiss}
          >
            <XCircle className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
