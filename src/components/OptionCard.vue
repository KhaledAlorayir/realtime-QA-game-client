<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <article class="card w-96 bg-neutral text-neutral-content">
    <div class="card-body items-center text-center">
      <h2 class="card-title">{{ title }}</h2>
    </div>
  </article>
</template>
