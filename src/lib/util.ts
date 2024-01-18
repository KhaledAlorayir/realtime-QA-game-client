import { ref, watch, type Ref, onMounted, onUnmounted } from "vue";
import debounce from "lodash.debounce";
import { useRoute } from "vue-router";

interface AlertMessage {
  message: string;
  type: "ERROR" | "INFO";
}

export const alertMessages = ref<AlertMessage[]>([]);

export function useDebounce(
  input: Ref<string>,
  onDebounced: (value: string) => void,
  ms = 1000
) {
  watch(
    input,
    debounce(() => {
      onDebounced(input.value);
    }, ms)
  );
}

export function useQueryParams<T>() {
  const route = useRoute();
  const params = ref<T>();

  watch(
    () => route.query,
    () => (params.value = route.query as T)
  );

  return params;
}

export function setAlertMessages(alerts: AlertMessage[], clearOld = true) {
  if (clearOld) {
    alertMessages.value = alerts;
  } else {
    alertMessages.value.push(...alerts);
  }
}

export function setAlertMessage(alert: AlertMessage, clearOld = true) {
  if (clearOld) {
    alertMessages.value = [alert];
  } else {
    alertMessages.value.push(alert);
  }
}

export function apiErrorHandler({ messages }: { messages: string[] }) {
  setAlertMessages(messages.map((message) => ({ message, type: "ERROR" })));
}

export function useCounter(seconds: number, onCounterEnd: () => void) {
  const counter = ref(seconds);
  let interval: NodeJS.Timeout | null = null;

  function initInterval() {
    interval = setInterval(() => {
      if (counter.value) {
        counter.value--;
        if (counter.value == 0) {
          onCounterEnd();
          destroyInterval();
        }
      }
    }, 1000);
  }

  function destroyInterval() {
    if (interval) {
      clearInterval(interval);
    }
  }

  onMounted(() => {
    initInterval();
  });

  onUnmounted(() => {
    destroyInterval();
  });

  function reset() {
    destroyInterval();
    counter.value = seconds;
    initInterval();
  }

  return { counter, reset };
}
