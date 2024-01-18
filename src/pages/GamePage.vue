<script setup lang="ts">
import { socket, gameState, socketLifecycleHandler } from "@/lib/socket";
import { useRoute } from "vue-router";
import GameStartInfo from "@/components/game/GameStartInfo.vue";
import QuestionAndAnswersHolder from "@/components/game/QuestionAndAnswersHolder.vue";
import GameResults from "@/components/game/GameResults.vue";
import OpponentDisconnected from "@/components/game/OpponentDisconnected.vue";
import type { SendQuestionBody } from "../../../qad/src/lib/types";

const { params } = useRoute();
const quizId = params.id as string;
socketLifecycleHandler(quizId);
</script>

<template>
  <main
    v-if="!gameState.startInfo"
    class="flex flex-1 justify-center items-center"
  >
    <section class="text-center space-y-2">
      <h2 class="font-extrabold text-2xl">Looking for an opponent..</h2>
      <span class="loading loading-ring w-16"></span>
    </section>
  </main>
  <main class="flex flex-col flex-1" v-else>
    <section class="flex flex-col flex-1 justify-center items-center">
      <div class="w-full md:w-3/4 lg:w-2/4">
        <div v-if="!gameState.isOpponentDisconnected">
          <article v-if="!gameState.results">
            <GameStartInfo
              :info="gameState.startInfo"
              v-if="!gameState.question"
            />

            <QuestionAndAnswersHolder
              v-else
              @answer="socket.emit('sendAnswer', { answerId: $event })"
              :correct-answer-id="gameState.correctAnswerId"
              :opponent-answered="gameState.isOpponentAnsweredQuestion"
              :quiz-info="gameState.startInfo"
              :question="(gameState.question as SendQuestionBody)"
            />
          </article>
          <GameResults
            v-else
            :quiz-info="gameState.startInfo"
            :results="gameState.results"
          />
        </div>
        <OpponentDisconnected v-else :quiz-info="gameState.startInfo" />
      </div>
    </section>
  </main>
</template>
