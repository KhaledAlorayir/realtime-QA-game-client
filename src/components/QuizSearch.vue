<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useDebounce } from "@/lib/util";
import { useRoute, useRouter } from "vue-router";

const inputValue = ref("");
const router = useRouter();
const route = useRoute();

useDebounce(inputValue, (value) => {
  router.push({ name: "home", query: { q: value } });
});

onMounted(async () => {
  await router.isReady();
  const q = (route.query.q as string)?.slice(0, 255);
  if (q) {
    inputValue.value = q;
  }
});
</script>

<template>
  <input
    maxlength="255"
    v-model="inputValue"
    type="text"
    placeholder="quizzes..."
    class="input input-sm input-bordered input-primary w-full max-w-xs"
  />
</template>
