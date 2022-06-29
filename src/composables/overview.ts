import useLocalStorage from "@/components/LocalStorage";
import { computed, ref } from "vue";
import { createId } from "@/utils/uid";

const groups = ref([
  {
    name: "Car",
    edit: true,
    collapsed: false,
    id: createId(),
  },
]);

const categories = ref([
  {
    name: "Ex. Gas",
    assigned: 0,
    spent: 0,
    available: 0,
    groupId: groups.value[0].id,
  },
]);

const monthlyAllowance = ref(0);
// const monthlyAllowance = useLocalStorage(0);
const spentHistory = { old: 0, recent: 0 };

const useGroups = () => {
  return { groups };
};

const useCategories = () => {
  const updateSpentHistory = (value: number) => {
    spentHistory.old = spentHistory.recent;
    spentHistory.recent = value;
  };
  const addTransaction = (categorySelected: string, amount: number) => {
    categories.value.forEach((category) => {
      if (category.name === categorySelected) {
        updateSpentHistory(amount + spentHistory.recent);
        category.spent += amount;
        monthlyAllowance.value += spentHistory.old - spentHistory.recent;
      }
    });
  };
  const handleExpenseInput = (e: any) => {
    console.log(spentHistory);
    updateSpentHistory(e.target.valueAsNumber);
    monthlyAllowance.value += spentHistory.old - spentHistory.recent;
  };
  return {
    categories,
    handleExpenseInput,
    addTransaction,
  };
};

const useBudget = () => {
  return { monthlyAllowance };
};

export { useGroups, useCategories, useBudget };
