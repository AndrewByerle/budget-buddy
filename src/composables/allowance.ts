import { ref, watch } from "vue";

const monthlyAllowance = ref(0);
const remaining = ref(monthlyAllowance.value);

export const useAllowance = () => {
  return { monthlyAllowance, remaining };
};
