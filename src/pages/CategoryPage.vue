<script setup lang="ts">
import InfiniteListViewVue from "@/components/InfiniteListView.vue";
import OptionCardVue from "@/components/OptionCard.vue";
import { getQuizzesByCategoryId } from "@/lib/api";
import { computed } from "vue";
import { useRoute } from "vue-router";

const { params } = useRoute();
const categoryId = params.id as string;
const { data, isLoading, isSuccess, hasNextPage, fetchNextPage } =
  getQuizzesByCategoryId(categoryId);

const isEmpty = computed(() => isSuccess.value && !data.value?.length);
</script>

<template>
  <InfiniteListViewVue
    :is-empty="isEmpty"
    :is-loading="isLoading"
    :has-next-page="hasNextPage"
    :is-success="isSuccess"
    v-on:load="fetchNextPage()"
  >
    <RouterLink
      v-for="item in data"
      :to="`categories/${item.id}`"
      :key="item.id"
    >
      <OptionCardVue :title="item.name" />
    </RouterLink>
  </InfiniteListViewVue>
</template>
