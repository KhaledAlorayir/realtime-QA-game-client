import { Socket, io } from "socket.io-client";
import type {
  ServerToClientEvents,
  ClientToServerEvents,
  QuizJoinedBody,
  SendQuestionBody,
  GameFinishedBody,
} from "../../../qad/src/lib/types";
import { Default, SERVER_ORIGIN } from "./ constants";
import { getUser } from "./supabase";
import { onMounted, onUnmounted, readonly, ref } from "vue";
import { apiErrorHandler, setAlertMessage } from "./util";

interface State {
  startInfo: QuizJoinedBody | null;
  question: SendQuestionBody | null;
  results: GameFinishedBody | null;
  isOpponentDisconnected: boolean;
  isOpponentAnsweredQuestion: boolean;
  correctAnswerId: string | null;
}

function getInitValues(): State {
  return {
    startInfo: null,
    question: null,
    results: null,
    isOpponentDisconnected: false,
    isOpponentAnsweredQuestion: false,
    correctAnswerId: null,
  };
}

const state = ref<State>(getInitValues());
export const gameState = readonly(state);

let showQuestionTimeout: NodeJS.Timeout | undefined;
let showResultsTimeout: NodeJS.Timeout | undefined;

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  SERVER_ORIGIN,
  {
    auth: { token: (await getUser())?.jwt },
    autoConnect: false,
  }
);

socket.on("quizJoined", (payload) => {
  state.value.startInfo = payload;
});

socket.on("sendQuestion", (question) => {
  if (question.uiStatusIndicator === "PREVIOUS_NOT_ANSWERED") {
    state.value.question = question;
    state.value.correctAnswerId = null;
  } else {
    const timeoutPeriodInSeconds =
      question.uiStatusIndicator === "FIRST_QUESTION"
        ? Default.SecondsBeforeStartingGame
        : Default.SecondsBeforeShowingNextQuestion;

    showQuestionTimeout = setTimeout(() => {
      state.value.question = question;
      state.value.correctAnswerId = null;
    }, timeoutPeriodInSeconds * 1000);
  }

  state.value.isOpponentAnsweredQuestion = false;
});

socket.on("gameFinished", (payload) => {
  showResultsTimeout = setTimeout(() => {
    state.value.results = payload;
  }, Default.SecondsBeforeShowingNextQuestion * 1000);
});

socket.on("opponentLeftGame", () => {
  state.value.isOpponentDisconnected = true;
  setAlertMessage({ message: "your opponent has left!", type: "INFO" });
});

socket.on("playerAnswered", async ({ playerId }) => {
  const user = await getUser();

  if (user && user.id !== playerId) {
    state.value.isOpponentAnsweredQuestion = true;
  }
});

socket.on("sendCorrectAnswer", ({ correctAnswerId }) => {
  state.value.correctAnswerId = correctAnswerId;
});

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
    clearTimeout(showQuestionTimeout);
    clearTimeout(showResultsTimeout);
    socket.disconnect();
  });
}
