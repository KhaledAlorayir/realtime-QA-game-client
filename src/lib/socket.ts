import { Socket, io } from "socket.io-client";
import type {
  ServerToClientEvents,
  ClientToServerEvents,
  QuizJoinedBody,
  SendQuestionBody,
} from "../../../qad/src/lib/types";
import { SERVER_ORIGIN } from "./ constants";
import { getUser } from "./supabase";
import { readonly, ref } from "vue";
import { apiErrorHandler } from "./util";

interface State {
  startInfo: QuizJoinedBody | null;
  showQuestions: boolean;
  question: SendQuestionBody | null;
  currentQuestionNumber: number;
}

const initValue: State = {
  startInfo: null,
  question: null,
  showQuestions: false,
  currentQuestionNumber: 0,
};

const state = ref<State>(initValue);
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
  state.value = initValue;
  clearTimeout(showQuestionsTimeout);
  console.log("disconnected");
});

socket.on("quizJoined", (payload) => {
  state.value.startInfo = payload;
  showQuestionsTimeout = setTimeout(() => {
    state.value.showQuestions = true;
  }, 2000);
});

socket.on("sendQuestion", (question) => {
  state.value.currentQuestionNumber++;
  state.value.question = question;
});

socket.on("opponentLeftGame", () => {});
socket.on("gameFinished", () => {});
socket.on("playerAnswered", () => {});
socket.on("sendCorrectAnswer", () => {});

socket.on("sendError", (apiError) => {
  apiErrorHandler(apiError);
});
