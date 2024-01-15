import { Socket, io } from "socket.io-client";
import type {
  ServerToClientEvents,
  ClientToServerEvents,
  QuizJoinedBody,
  SendQuestionBody,
  GameFinishedBody,
} from "../../../qad/src/lib/types";
import { SERVER_ORIGIN } from "./ constants";
import { getUser } from "./supabase";
import { onMounted, onUnmounted, readonly, ref } from "vue";
import { apiErrorHandler } from "./util";

interface State {
  startInfo: QuizJoinedBody | null;
  showQuestions: boolean;
  question: SendQuestionBody | null;
  results: GameFinishedBody | null;
}

function getInitValues(): State {
  return {
    startInfo: null,
    question: null,
    showQuestions: false,
    results: null,
  };
}

const state = ref<State>(getInitValues());
export const gameState = readonly(state);
let showQuestionsTimeout: NodeJS.Timeout | undefined;

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  SERVER_ORIGIN,
  {
    auth: { token: (await getUser())?.access_token },
    autoConnect: false,
  }
);

socket.on("connect", () => {
  console.log("connected");
});

socket.on("disconnect", () => {
  //navigate to reset?
  console.log("disconnected");
});

socket.on("quizJoined", (payload) => {
  state.value.startInfo = payload;
  showQuestionsTimeout = setTimeout(() => {
    state.value.showQuestions = true;
  }, 2000);
});

socket.on("sendQuestion", (question) => {
  state.value.question = question;
});

socket.on("gameFinished", (paylaod) => {
  state.value.results = paylaod;
});

socket.on("opponentLeftGame", () => {});

socket.on("playerAnswered", () => {});
socket.on("sendCorrectAnswer", () => {});

socket.on("sendError", (apiError) => {
  apiErrorHandler(apiError);
});

export function socketLifecycleHandler(quizId: string) {
  onMounted(() => {
    socket.connect();
    socket.emit("joinQuiz", { quizId });
  });

  onUnmounted(() => {
    state.value = getInitValues();
    clearTimeout(showQuestionsTimeout);
    socket.disconnect();
  });
}
