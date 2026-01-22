/**
 * ============================================
 * TEMPLATE: useForm Hook
 * ============================================
 *
 * Form handling wrapper hook'u.
 *
 * Özellikler:
 * - ✅ react-hook-form + Zod integration
 * - ✅ Type safety
 * - ✅ Error handling
 * - ✅ Toast notifications
 *
 * Kurulum: src/hooks/use-form.ts
 *
 * @see templates/utility-hook-templates/PROMPT.md
 * ============================================
 */

"use client";

import { useForm as useRHForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

interface UseFormProps<T extends z.ZodSchema> {
  schema: T;
  defaultValues?: z.infer<T>;
  onSubmit: (data: z.infer<T>) => Promise<void>;
}

export function useForm<T extends z.ZodSchema>({
  schema,
  defaultValues,
  onSubmit,
}: UseFormProps<T>) {
  const form = useRHForm({
    resolver: zodResolver(schema as any),
    defaultValues: defaultValues as any,
  });

  const handleSubmit = async (data: any) => {
    try {
      await onSubmit(data);
    } catch (error) {
      toast.error("Bir hata oluştu");
      console.error(error);
    }
  };

  return {
    ...form,
    handleSubmit: form.handleSubmit(handleSubmit),
    Controller,
  };
}
