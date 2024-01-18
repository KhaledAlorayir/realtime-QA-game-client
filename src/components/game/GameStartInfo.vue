<script setup lang="ts">
import type { QuizJoinedBody } from "../../../../qad/src/lib/types";
import PlayerCard from "./PlayerCard.vue";
defineProps<{ info: QuizJoinedBody }>();
</script>

<template>
  <div class="space-y-2 lg:space-y-0">
    <p class="text-center font-extrabold text-2xl text-primary">
      {{ info.quizName }}
    </p>
    <section class="flex justify-around items-center">
      <PlayerCard :player="info.player1">
        <p class="font-semibold" v-if="info.player1.wins">
          {{ info.player1.wins }} wins
        </p>
      </PlayerCard>
      <p class="font-extrabold text-2xl">VS</p>
      <PlayerCard :player="info.player2">
        <p class="font-semibold" v-if="info.player2.wins">
          {{ info.player2.wins }} wins
        </p>
      </PlayerCard>
    </section>
  </div>
</template>
