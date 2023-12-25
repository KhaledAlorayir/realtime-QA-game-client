import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://xtbfkrscymgcoumstvpf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0YmZrcnNjeW1nY291bXN0dnBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg1MTc3NjIsImV4cCI6MjAxNDA5Mzc2Mn0.e-QybI0Vh89meu3HXQN3M8kWQn8b1cqmBemT7yc7Y-U"
);

export const login = () =>
  supabase.auth.signInWithOAuth({ provider: "discord" });

export const logout = () => supabase.auth.signOut();

export async function getUser() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  return data.session;
}
