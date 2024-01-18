<script setup lang="ts">
import { useUser } from "@/lib/auth";
import PlayerCard from "@/components/game/PlayerCard.vue";
import type {
  QuizJoinedBody,
  GameFinishedBody,
} from "../../../../qad/src/lib/types";

const props = defineProps<{
  quizInfo: QuizJoinedBody;
  results: GameFinishedBody;
}>();

const user = useUser();

function getResultsByPlayerId(playerId: string) {
  if (props.results.player1.userId === playerId) {
    return props.results.player1;
  }
  return props.results.player2;
}

function getResultsTitle() {
  if (!props.results.winnerId) {
    return "its a draw.";
  }
  if (user.data.value?.id === props.results.winnerId) {
    return "you won !";
  }
  return "you lost !";
}
</script>

<template>
  <article class="space-y-4">
    <p class="text-center font-bold text-xl text-primary">
      {{ getResultsTitle() }}
    </p>
    <section class="flex justify-around items-center">
      <PlayerCard :player="quizInfo.player1">
        <p class="font-semibold">
          {{ getResultsByPlayerId(quizInfo.player1.userId).score }}
          / {{ quizInfo.numberOfQuestions }}
        </p>
      </PlayerCard>
      <PlayerCard :player="quizInfo.player2">
        <p class="font-semibold">
          {{ getResultsByPlayerId(quizInfo.player2.userId).score }}
          / {{ quizInfo.numberOfQuestions }}
        </p>
      </PlayerCard>
    </section>
  </article>
</template>
