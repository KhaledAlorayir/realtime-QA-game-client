import { getUser, supabase } from "@/lib/supabase";
import type { Subscription } from "@supabase/supabase-js";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { onMounted, onUnmounted } from "vue";

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

  onMounted(() => {
    const { data } = supabase.auth.onAuthStateChange(() => {
      queryClient.invalidateQueries({ queryKey: USE_USER_QK });
    });
    sub = data.subscription;
  });

  onUnmounted(() => sub?.unsubscribe());
}
