<script setup lang="ts">
import { socket, gameState } from "@/lib/socket";
import { onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import GameStartInfo from "@/components/game/GameStartInfo.vue";

const { params } = useRoute();
const quizId = params.id as string;

//refactor logic to socket.ts?
onMounted(() => {
  socket.connect();
  socket.emit("joinQuiz", { quizId });
});

onUnmounted(() => {
  socket.disconnect();
});
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
      <GameStartInfo
        :info="gameState.startInfo"
        v-if="!gameState.showQuestions"
      />
      <section
        class="space-y-2"
        v-if="gameState.showQuestions && gameState.question"
      >
        <p class="text-right font-semibold text-accent">
          {{ gameState.currentQuestionNumber }} /
          {{ gameState.startInfo.numberOfQuestions }}
        </p>
        <article>
          <p class="text-center font-extrabold text-xl text-primary">
            {{ gameState.question.content }}
          </p>
        </article>
      </section>
    </section>
  </main>
</template>
