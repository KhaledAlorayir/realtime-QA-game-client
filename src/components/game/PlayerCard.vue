<script setup lang="ts">
import { useUser } from "@/lib/auth";
import type { QuizJoinedBody } from "../../../../qad/src/lib/types";
defineProps<{ player: QuizJoinedBody["player1"] }>();
const user = useUser();
</script>

<template>
  <article class="text-center">
    <div class="avatar">
      <div
        class="w-32 rounded-full"
        :class="{
          'border-primary border-4': user.data.value?.id === player.userId,
        }"
      >
        <img :src="player.img" alt="player" />
      </div>
    </div>
    <p class="font-semibold text-lg text-secondary">
      {{ player.username || "unknown" }}
    </p>
    <slot></slot>
  </article>
</template>
