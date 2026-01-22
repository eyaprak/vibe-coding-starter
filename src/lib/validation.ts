/**
 * Validation Schemas
 *
 * Zod validation schemas for forms and API requests.
 * This file provides common validation schemas used throughout the application.
 */

import { z } from "zod";

/**
 * Register schema
 * Validates user registration input
 */
export const registerSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  password: z
    .string()
    .min(8, "Şifre en az 8 karakter olmalıdır")
    .regex(/[A-Z]/, "Şifre en az bir büyük harf içermelidir")
    .regex(/[a-z]/, "Şifre en az bir küçük harf içermelidir")
    .regex(/[0-9]/, "Şifre en az bir rakam içermelidir"),
});

/**
 * Login schema
 * Validates user login input
 */
export const loginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  password: z.string().min(1, "Şifre gereklidir"),
});

/**
 * Profile schema
 * Validates profile update input
 */
export const profileSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır").optional(),
  image: z.string().url("Geçerli bir URL giriniz").optional(),
});

/**
 * Password schema
 * Validates password change input
 */
export const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Mevcut şifre gereklidir"),
    newPassword: z
      .string()
      .min(8, "Şifre en az 8 karakter olmalıdır")
      .regex(/[A-Z]/, "Şifre en az bir büyük harf içermelidir")
      .regex(/[a-z]/, "Şifre en az bir küçük harf içermelidir")
      .regex(/[0-9]/, "Şifre en az bir rakam içermelidir"),
    confirmNewPassword: z.string().min(1, "Şifre tekrarı gereklidir"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmNewPassword"],
  });

/**
 * Settings schema
 * Validates account settings input
 */
export const settingsSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz").optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type PasswordInput = z.infer<typeof passwordSchema>;
export type SettingsInput = z.infer<typeof settingsSchema>;
