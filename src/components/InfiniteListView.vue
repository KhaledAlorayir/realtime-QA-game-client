<script setup lang="ts">
defineProps<{
  isLoading: boolean;
  isSuccess: boolean;
  hasNextPage: boolean;
  isEmpty?: boolean;
}>();

defineEmits(["load"]);
</script>

<template>
  <main class="flex flex-1 flex-col">
    <p v-if="isEmpty">no results found</p>
    <div v-else class="flex flex-1 flex-col">
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
        <article class="space-y-4">
          <div>
            <div class="flex justify-center flex-wrap gap-x-4 gap-y-2">
              <slot></slot>
            </div>
          </div>
          <button
            v-if="hasNextPage"
            v-on:click="$emit('load')"
            class="btn btn-primary"
          >
            More
          </button>
        </article>
      </section>
    </div>
  </main>
</template>
