<script setup lang="ts">
import type { QuizJoinedBody } from "../../../../qad/src/lib/types";
defineProps<{ player: QuizJoinedBody["player1"] }>();
</script>

<template>
  <article class="text-center">
    <div class="avatar">
      <div class="w-32 rounded-full">
        <img :src="player.img" alt="player1" />
      </div>
    </div>
    <p class="font-semibold text-lg text-secondary">
      {{ player.username || "unknown" }}
    </p>

    <p class="font-semibold" v-if="player.wins">{{ player.wins }} wins</p>
  </article>
</template>
