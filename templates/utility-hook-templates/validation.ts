/**
 * ============================================
 * TEMPLATE: Validation Schemas
 * ============================================
 *
 * Zod validation schemas template'i.
 *
 * Özellikler:
 * - ✅ registerSchema
 * - ✅ loginSchema
 * - ✅ profileSchema
 * - ✅ passwordSchema
 * - ✅ settingsSchema
 *
 * Kurulum: src/lib/validation.ts
 *
 * @see templates/utility-hook-templates/PROMPT.md
 * ============================================
 */

import { z } from "zod";

/**
 * Register Validation Schema
 */
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "İsim en az 2 karakter olmalı")
    .max(50, "İsim en fazla 50 karakter olabilir"),
  email: z.string().email("Geçersiz email adresi"),
  password: z
    .string()
    .min(8, "Şifre en az 8 karakter olmalı")
    .regex(/[A-Z]/, "Şifre en az bir büyük harf içermeli")
    .regex(/[a-z]/, "Şifre en az bir küçük harf içermeli")
    .regex(/\d/, "Şifre en az bir rakam içermeli"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmPassword"],
});

/**
 * Login Validation Schema
 */
export const loginSchema = z.object({
  email: z.string().email("Geçersiz email adresi"),
  password: z.string().min(1, "Şifre gerekli"),
});

/**
 * Profile Validation Schema
 */
export const profileSchema = z.object({
  name: z
    .string()
    .min(2, "İsim en az 2 karakter olmalı")
    .max(50, "İsim en fazla 50 karakter olabilir")
    .optional(),
  image: z.string().url("Geçersiz URL").optional(),
});

/**
 * Password Change Validation Schema
 */
export const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Mevcut şifre gerekli"),
  newPassword: z
    .string()
    .min(8, "Şifre en az 8 karakter olmalı")
    .regex(/[A-Z]/, "Şifre en az bir büyük harf içermeli")
    .regex(/[a-z]/, "Şifre en az bir küçük harf içermeli")
    .regex(/\d/, "Şifre en az bir rakam içermeli"),
  confirmNewPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmNewPassword"],
});

/**
 * Settings Validation Schema
 */
export const settingsSchema = z.object({
  email: z.string().email("Geçersiz email adresi").optional(),
  // Diğer ayar field'ları buraya eklenebilir
  notifications: z.boolean().optional(),
  theme: z.enum(["light", "dark", "system"]).optional(),
});

/**
 * Type exports
 */
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type PasswordInput = z.infer<typeof passwordSchema>;
export type SettingsInput = z.infer<typeof settingsSchema>;
