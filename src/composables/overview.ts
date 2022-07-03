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
    expense: 0,
    groupId: groups.value[0].id,
    id: createId(),
  },
]);

const monthlyAllowance = ref(0);
// const monthlyAllowance = useLocalStorage("monthly_allowance", 45);

const useGroups = () => {
  return { groups };
};

const useCategories = () => {
  const addCategory = (groupId: string) => {
    categories.value.push({
      name: "Category",
      expense: 0,
      groupId: groupId,
      id: createId(),
    });
  };

  const increaseCategoryExpense = (id: string, value: number) => {
    categories.value.forEach((category) => {
      if (category.id === id) {
        category.expense += value;
      }
    });
  };
  const clearCategories = () => {
    categories.value.forEach((category) => {
      monthlyAllowance.value += category.expense;
      category.expense = 0;
    });
  };

  return {
    categories,
    clearCategories,
    addCategory,
    increaseCategoryExpense,
  };
};

const useMonthlyAllowance = () => {
  return { monthlyAllowance };
};

export { useGroups, useCategories, useMonthlyAllowance };
