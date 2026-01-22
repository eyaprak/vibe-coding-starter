/**
 * ============================================
 * TEMPLATE: useUser Hook
 * ============================================
 *
 * Kullanıcı verisi fetching hook'u.
 *
 * Özellikler:
 * - ✅ Kullanıcı verisi fetching
 * - ✅ Mutations (update, delete)
 * - ✅ Loading states
 * - ✅ Error handling
 *
 * Kurulum: src/hooks/use-user.ts
 *
 * @see templates/utility-hook-templates/PROMPT.md
 * ============================================
 */

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: string;
  createdAt: Date;
}

/**
 * Kullanıcı verisini fetch eder.
 */
export function useUser() {
  const queryClient = useQueryClient();

  // Fetch user
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("/api/user");
      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();
      return data.user as User;
    },
  });

  // Update user mutation
  const updateMutation = useMutation({
    mutationFn: async (updates: Partial<User>) => {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!res.ok) throw new Error("Failed to update user");

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Profil güncellendi");
    },
    onError: () => {
      toast.error("Profil güncellenemedi");
    },
  });

  // Delete user mutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/user", {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete user");

      return res.json();
    },
    onSuccess: () => {
      toast.success("Hesap silindi");
      window.location.href = "/";
    },
    onError: () => {
      toast.error("Hesap silinemedi");
    },
  });

  return {
    user,
    isLoading,
    updateUser: updateMutation.mutate,
    deleteUser: deleteMutation.mutate,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
