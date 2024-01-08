<script setup lang="ts">
import { login, logout } from "../lib/supabase";
import QuizSearch from "@/components/QuizSearch.vue";
import { useUser, authListener } from "@/lib/auth";
import { useQueryParams } from "@/lib/util";
import { getQuizzesBySearch } from "@/lib/api";
import { computed } from "vue";
import InfiniteListViewVue from "@/components/InfiniteListView.vue";
import OptionCardVue from "@/components/OptionCard.vue";
import ErrorMessagesVue from "./ErrorMessages.vue";

authListener();
const { data: auth } = useUser();
const params = useQueryParams<{ q: string }>();
const { data, isLoading, isSuccess, hasNextPage, fetchNextPage } =
  getQuizzesBySearch(params);
const isNoSearchResults = computed(
  () => !data?.value?.length && isSuccess.value
);
</script>

<template>
  <main class="container mx-auto py-6 min-h-svh flex flex-col px-4 lg:px-0">
    <header class="flex items-center justify-between">
      <section class="flex items-center gap-4">
        <RouterLink to="/">
          <h1 class="text-primary font-bold text-2xl">QAD</h1>
        </RouterLink>
        <QuizSearch />
      </section>
      <button class="btn btn-secondary" v-on:click="login()" v-if="!auth">
        discord login
      </button>
      <section class="flex items-center gap-4" v-else>
        <RouterLink to="/stats" class="avatar">
          <div class="w-10 rounded-full">
            <img v-bind:src="auth.image" alt="profile" />
          </div>
        </RouterLink>
        <button class="btn btn-secondary" v-on:click="logout()">logout</button>
      </section>
    </header>
    <ErrorMessagesVue />
    <InfiniteListViewVue
      v-if="!!params?.q?.trim().length"
      :is-empty="isNoSearchResults"
      :is-loading="isLoading"
      :has-next-page="hasNextPage"
      :is-success="isSuccess"
      v-on:load="fetchNextPage()"
    >
      <RouterLink v-for="item in data" :to="`/games/${item.id}`" :key="item.id">
        <OptionCardVue :title="item.name" />
      </RouterLink>
    </InfiniteListViewVue>
    <slot v-else></slot>
  </main>
</template>
