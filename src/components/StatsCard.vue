<script setup lang="ts">
defineProps<{ label: string; value: number }>();
</script>

<template>
  <article class="bg-neutral min-w-32 max-w-lg rounded-md px-3 py-2 space-y-2">
    <p class="font-bold text-lg">
      {{ label }}
    </p>
    <p class="font-extrabold text-xl text-center">
      {{ value }}
    </p>
  </article>
</template>
