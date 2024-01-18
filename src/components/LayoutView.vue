<script setup lang="ts">
import QuizSearch from "@/components/QuizSearch.vue";
import { useUser, authListener, useLogin, useLogout } from "@/lib/auth";
import { useQueryParams } from "@/lib/util";
import { getQuizzesBySearch } from "@/lib/api";
import { computed } from "vue";
import InfiniteListViewVue from "@/components/InfiniteListView.vue";
import OptionCardVue from "@/components/OptionCard.vue";
import AlertMessages from "./AlertMessages.vue";

authListener();
const { data: auth } = useUser();

const params = useQueryParams<{ q: string }>();

const { data, isLoading, isSuccess, hasNextPage, fetchNextPage } =
  getQuizzesBySearch(params);

const isNoSearchResults = computed(
  () => !data?.value?.length && isSuccess.value
);

const { mutate: login, isPending: isLoginPending } = useLogin();
const { mutate: logout, isPending: isLogoutPending } = useLogout();

const isAuthPending = computed(
  () => isLoginPending.value || isLogoutPending.value
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
      <button
        :disabled="isAuthPending"
        class="btn btn-secondary"
        :class="{ 'loading loading-spinner': isAuthPending }"
        @click="login()"
        v-if="!auth"
      >
        discord login
      </button>
      <section class="flex items-center gap-4" v-else>
        <RouterLink to="/stats" class="avatar">
          <div class="w-10 rounded-full">
            <img v-bind:src="auth.image" alt="profile" />
          </div>
        </RouterLink>
        <button
          :disabled="isAuthPending"
          class="btn btn-secondary"
          :class="{ 'loading loading-spinner': isAuthPending }"
          @click="logout()"
        >
          logout
        </button>
      </section>
    </header>
    <AlertMessages />
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
