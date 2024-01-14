import { getUser, supabase, login, logout } from "@/lib/supabase";
import type { Subscription } from "@supabase/supabase-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { onMounted, onUnmounted } from "vue";
import {
  useRoute,
  type NavigationGuardWithThis,
  useRouter,
  type RouteRecordName,
} from "vue-router";
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

export function useLogin() {
  return useMutation({
    mutationFn: () => login(),
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: () => logout(),
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
      if (event === "SIGNED_OUT" && isAuthenticatedRoute(route.name)) {
        router.push({ name: RoutesNames.home });
      }
    });
    sub = data.subscription;
  });

  onUnmounted(() => sub?.unsubscribe());
}

export const authGuard: NavigationGuardWithThis<undefined> = async (to) => {
  if (isAuthenticatedRoute(to.name)) {
    const isAuthenticated = !!(await getUser());
    if (isAuthenticated) return true;
    login(to.fullPath);
    return false;
  }
  return true;
};

function isAuthenticatedRoute(
  name: RouteRecordName | null | undefined
): boolean {
  return !!(name && ProtectedRoutes.includes(name.toString()));
}
