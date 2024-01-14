import { hc } from "hono/client";
import type { AppType } from "../../../qad/src/index";
import type { PaginatedResponse } from "../../../qad/src/lib/types";
import {
  useInfiniteQuery,
  type InfiniteData,
  useQuery,
} from "@tanstack/vue-query";
import { Default } from "./ constants";
import { computed, type Ref } from "vue";
import type { ClientResponse } from "node_modules/hono/dist/types/client/types";
import { getUser } from "./supabase";

const hono = hc<AppType>("http://localhost:3000/", {
  headers: { Authorization: `Bearer ${(await getUser())?.access_token}` },
});

async function fetcher<T>(promise: Promise<ClientResponse<T>>) {
  const data = await promise;
  const json = await data.json();
  if (!data.ok) {
    throw json;
  }
  return json;
}

function getNextPageParam(last: PaginatedResponse<any>) {
  return last.hasNextPage ? last.page + 1 : undefined;
}

function flattenPaginatedResponse<T>(data: InfiniteData<PaginatedResponse<T>>) {
  return data.pages.map((page) => page.data).flat();
}

function getPaginatedQuery(page: number) {
  return { pageSize: Default.pageSize, page: String(page) };
}

export function getCategories() {
  return useInfiniteQuery({
    queryKey: ["categories"],
    queryFn: async ({ pageParam }) => {
      return fetcher(
        hono.api.categories.$get({
          query: getPaginatedQuery(pageParam),
        })
      );
    },
    getNextPageParam,
    initialPageParam: 0,
    select: flattenPaginatedResponse,
  });
}

export function getQuizzesByCategoryId(categoryId: string) {
  return useInfiniteQuery({
    queryKey: ["categories", categoryId],
    queryFn: async ({ pageParam }) => {
      return fetcher(
        hono.api.categories[":categoryId"].quizzes.$get({
          param: { categoryId },
          query: getPaginatedQuery(pageParam),
        })
      );
    },
    getNextPageParam,
    initialPageParam: 0,
    select: flattenPaginatedResponse,
  });
}

export function getQuizzesBySearch(payload: Ref<{ q: string } | undefined>) {
  return useInfiniteQuery({
    queryKey: ["quizzes", payload],
    queryFn: async ({ pageParam }) => {
      return fetcher(
        hono.api.quizzes.$get({
          query: {
            ...getPaginatedQuery(pageParam),
            q: payload.value?.q,
          },
        })
      );
    },
    getNextPageParam,
    initialPageParam: 0,
    select: flattenPaginatedResponse,
    enabled: computed(() => !!payload.value?.q),
  });
}

export function getStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: () => fetcher(hono.api.stats.$get()),
  });
}
