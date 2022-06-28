import useLocalStorage from "@/components/LocalStorage";
import { computed, ref } from "vue";

const groups = ref([
  {
    name: "Car",
    edit: true,
    collapsed: false,
  },
]);
const useGroups = () => {
  return { groups };
};

const useCategories = () => {
  const categories = ref([
    {
      name: "Ex. Gas",
      assigned: 0,
      spent: 0,
      available: 0,
    },
  ]);
  // todo func createCategory
  return { categories };
};

const monthlyAllowance = ref(0);
// const monthlyAllowance = useLocalStorage(0);

const useBudget = () => {
  return { monthlyAllowance };
};

export { useGroups, useCategories, useBudget };
