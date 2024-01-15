<script setup lang="ts">
import { useCounter } from "@/lib/util";
import { ref, watch } from "vue";
import type {
  QuizJoinedBody,
  SendQuestionBody,
} from "../../../../qad/src/lib/types";

const props = defineProps<{
  quizInfo: QuizJoinedBody;
  question: SendQuestionBody;
}>();

const emit = defineEmits<{
  (e: "answer", id: string | null): void;
}>();

const { counter, reset } = useCounter(400);
const isAnswered = ref(false);

watch(
  () => props.question,
  () => {
    reset();
    isAnswered.value = false;
  }
);

function answerHandler(id: string | null) {
  isAnswered.value = true;
  emit("answer", id);
}
</script>

<template>
  <section class="space-y-8">
    <article class="space-y-2">
      <div class="flex justify-between font-semibold">
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
        :disabled="isAnswered"
        :class="{ disabled: isAnswered }"
        @click="answerHandler(answer.id)"
      >
        {{ answer.content }}
      </button>
    </article>
  </section>
</template>
