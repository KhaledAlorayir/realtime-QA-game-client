<script setup lang="ts">
import { getCategories } from "@/lib/api";
import InfiniteListViewVue from "@/components/InfiniteListView.vue";
import OptionCardVue from "@/components/OptionCard.vue";

const { data, isLoading, isSuccess, hasNextPage, fetchNextPage } =
  getCategories();
</script>

<template>
  <InfiniteListViewVue
    :is-loading="isLoading"
    :has-next-page="hasNextPage"
    :is-success="isSuccess"
    v-on:load="fetchNextPage()"
  >
    <RouterLink
      v-for="item in data"
      :to="`/categories/${item.id}`"
      :key="item.id"
    >
      <OptionCardVue :title="item.name" />
    </RouterLink>
  </InfiniteListViewVue>
</template>
