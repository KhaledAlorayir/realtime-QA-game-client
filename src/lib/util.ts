import { ref, watch, type Ref } from "vue";
import debounce from "lodash.debounce";
import { useRoute } from "vue-router";

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
