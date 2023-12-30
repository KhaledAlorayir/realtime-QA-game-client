import { hc } from "hono/client";
import type { AppType } from "../../../qad/src/index";
import { useQuery } from "@tanstack/vue-query";

const hono = hc<AppType>("http://localhost:3000/");

export function getCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await hono.api.categories.$get({
        query: { pageSize: "30" },
      });

      if (!data.ok) {
        throw new Error("not ok");
      }

      return data.json();
    },
  });
}
