import { ref, watch, type Ref, onMounted, onUnmounted } from "vue";
import debounce from "lodash.debounce";
import { useRoute } from "vue-router";

export const errorMessages = ref<string[]>([]);

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

export function apiErrorHandler({ messages }: { messages: string[] }) {
  errorMessages.value = messages;
}

export function useCounter(seconds: number) {
  const counter = ref(seconds);
  let interval: NodeJS.Timeout | null = null;

  function initInterval() {
    interval = setInterval(() => {
      if (counter.value) {
        counter.value--;
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
