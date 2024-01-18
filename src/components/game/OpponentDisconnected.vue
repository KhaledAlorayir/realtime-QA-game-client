<script setup lang="ts">
import PlayerCard from "@/components/game/PlayerCard.vue";
import { useUser } from "@/lib/auth";
import type { QuizJoinedBody } from "../../../../qad/src/lib/types";

const props = defineProps<{
  quizInfo: QuizJoinedBody;
}>();
const { data } = useUser();

function getPlayerInfoById(playerId: string) {
  if (props.quizInfo.player1.userId === playerId) {
    return props.quizInfo.player1;
  }
  return props.quizInfo.player2;
}
</script>

<template>
  <PlayerCard v-if="data" :player="getPlayerInfoById(data.id)">
    <p class="font-semibold">you won !</p>
  </PlayerCard>
</template>
