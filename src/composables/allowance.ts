import { ref } from "vue";

const monthlyAllowance = ref(0);
export const useMonthlyAllowance = () => {
  return { monthlyAllowance };
};
