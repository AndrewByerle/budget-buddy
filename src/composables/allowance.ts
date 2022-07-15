import { ref } from "vue";

// const monthlyAllowance = useLocalStorage("monthly_allowance", 45);
const monthlyAllowance = ref(0);
const remaining = ref(0);
export const useMonthlyAllowance = () => {
  return { monthlyAllowance };
};
