import { ref, watch } from "vue";

const useLocalStorage = (key: any) => {
  let init = localStorage.getItem(key);

  const variable = ref(init ? JSON.parse(init) : undefined);

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
