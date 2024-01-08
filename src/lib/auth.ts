import { getUser, supabase, login } from "@/lib/supabase";
import type { Subscription } from "@supabase/supabase-js";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { onMounted, onUnmounted } from "vue";
import { useRoute, type NavigationGuardWithThis, useRouter } from "vue-router";
import { ProtectedRoutes, RoutesNames } from "./ constants";

const USE_USER_QK = ["auth"];

export function useUser() {
  return useQuery({
    queryKey: USE_USER_QK,
    queryFn: getUser,
    select: (session) =>
      session
        ? {
            id: session.user.id,
            image: session.user.user_metadata.avatar_url,
            name: session.user.user_metadata.custom_claims.global_name,
          }
        : null,
  });
}

export function authListener() {
  const queryClient = useQueryClient();
  let sub: Subscription | null = null;
  const route = useRoute();
  const router = useRouter();

  onMounted(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      queryClient.invalidateQueries({ queryKey: USE_USER_QK });
      if (
        event === "SIGNED_OUT" &&
        ProtectedRoutes.includes(route.name?.toString() || "")
      ) {
        router.push({ name: RoutesNames.home });
      }
    });
    sub = data.subscription;
  });

  onUnmounted(() => sub?.unsubscribe());
}

export const authGuard: NavigationGuardWithThis<undefined> = async (to) => {
  if (to.name && ProtectedRoutes.includes(to.name.toString())) {
    const isAuthenticated = !!(await getUser());
    if (isAuthenticated) return true;
    login(to.fullPath);
    return false;
  }
  return true;
};
