/**
 * ============================================
 * TEMPLATE: useAuth Hook
 * ============================================
 *
 * Auth state management hook'u.
 *
 * Özellikler:
 * - ✅ Session state
 * - ✅ Loading state
 * - ✅ Error state
 * - ✅ User type safety
 *
 * Kurulum: src/hooks/use-auth.ts
 *
 * @see templates/utility-hook-templates/PROMPT.md
 * ============================================
 */

"use client";

import { useSession } from "next-auth/react";
import { useMemo } from "react";

export function useAuth() {
  const { data: session, status, update } = useSession();

  const user = useMemo(() => {
    return session?.user;
  }, [session]);

  const isLoading = useMemo(() => {
    return status === "loading";
  }, [status]);

  const isAuthenticated = useMemo(() => {
    return status === "authenticated";
  }, [status]);

  const isAdmin = useMemo(() => {
    return user?.role === "ADMIN";
  }, [user]);

  return {
    user,
    session,
    status,
    isLoading,
    isAuthenticated,
    isAdmin,
    update,
  };
}
