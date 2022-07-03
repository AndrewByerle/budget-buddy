import { ref, watch } from "vue";

const useLocalStorage = <T>(key: any, defaultValue: T) => {
  let init = localStorage.getItem(key);

  const variable = ref<T>(init ? JSON.parse(init) : defaultValue);

  watch(
    () => variable.value,
    (to) => {
      localStorage.setItem(key, JSON.stringify(to));
    },
    { deep: true }
  );

  return variable;
};

export default useLocalStorage;
