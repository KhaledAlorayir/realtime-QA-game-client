<script setup lang="ts">
import { useCounter } from "@/lib/util";
import { ref, watch } from "vue";
import type {
  QuizJoinedBody,
  SendQuestionBody,
} from "../../../../qad/src/lib/types";
import { Default } from "@/lib/ constants";

const props = defineProps<{
  quizInfo: QuizJoinedBody;
  question: SendQuestionBody;
  opponentAnswered: boolean;
  correctAnswerId: string | null;
}>();

const emit = defineEmits<{
  (e: "answer", id: string | null): void;
}>();

const { counter, reset } = useCounter(Default.counterInSeconds, () =>
  answerHandler(null)
);
const chosenAnswerId = ref<string | null>(null);

watch(
  () => props.question,
  () => {
    reset();
    chosenAnswerId.value = null;
  }
);

function answerHandler(id: string | null) {
  if (!chosenAnswerId.value) {
    emit("answer", id);
  }
  chosenAnswerId.value = id;
}
</script>

<template>
  <section class="space-y-8">
    <article class="space-y-2">
      <div
        data-tip="opponent answerd ;0"
        class="flex justify-between font-semibold"
        :class="{ 'tooltip tooltip-open tooltip-top': opponentAnswered }"
      >
        <p>{{ counter }}</p>
        <p class="text-accent">
          {{ question.questionNumber }} /
          {{ quizInfo.numberOfQuestions }}
        </p>
      </div>
      <p
        v-html="question.content"
        class="text-center font-extrabold text-xl text-primary"
      ></p>
    </article>
    <article class="grid grid-cols-2 gap-4">
      <button
        class="btn btn-lg btn-secondary"
        v-for="answer in question.answers"
        :key="answer.id"
        v-html="answer.content"
        :disabled="!!chosenAnswerId"
        :class="{
          'disabled:bg-cyan-700 disabled:border-cyan-700 disabled:text-white':
            chosenAnswerId === answer.id && !correctAnswerId,
          'disabled:bg-emerald-600 disabled:border-emerald-500 disabled:text-white':
            answer.id === correctAnswerId,
        }"
        @click="answerHandler(answer.id)"
      ></button>
    </article>
  </section>
</template>
