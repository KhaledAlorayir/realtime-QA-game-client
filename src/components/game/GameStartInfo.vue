<script setup lang="ts">
import type { QuizJoinedBody } from "../../../../qad/src/lib/types";
import GameStartPlayerCard from "./GameStartPlayerCard.vue";
defineProps<{ info: QuizJoinedBody }>();
</script>

<template>
  <div class="w-full space-y-2 md:w-3/4 lg:space-y-0">
    <p class="text-center font-extrabold text-2xl text-primary">
      {{ info.quizName }}
    </p>
    <section class="flex justify-around items-center">
      <GameStartPlayerCard :player="info.player1" />
      <p class="font-extrabold text-2xl">VS</p>
      <GameStartPlayerCard :player="info.player2" />
    </section>
  </div>
</template>
