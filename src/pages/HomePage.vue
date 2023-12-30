<script setup lang="ts">
import { getCategories } from "@/lib/api";
const { data, isLoading, isSuccess } = getCategories();
</script>

<template>
  <main class="flex flex-1 flex-col">
    <section v-if="isLoading" class="flex-1 flex items-center">
      <div class="flex justify-center flex-wrap gap-x-4 gap-y-2">
        <article
          v-for="item in [1, 2, 3, 4, 5]"
          :key="item"
          class="skeleton card w-96 bg-neutral text-neutral-content"
        >
          <div class="card-body items-center text-center">
            <h2 class="card-title invisible">music</h2>
          </div>
        </article>
      </div>
    </section>
    <section v-if="isSuccess" class="flex-1 flex items-center">
      <div class="flex justify-center flex-wrap gap-x-4 gap-y-2">
        <RouterLink
          to="/"
          v-for="item in data?.data"
          :key="item.id"
          class="card w-96 bg-neutral text-neutral-content"
        >
          <div class="card-body items-center text-center">
            <h2 class="card-title">{{ item.name }}</h2>
          </div>
        </RouterLink>
      </div>
    </section>
  </main>
</template>
