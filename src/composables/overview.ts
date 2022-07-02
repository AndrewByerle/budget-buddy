import useLocalStorage from "@/components/LocalStorage";
import { computed, ref } from "vue";
import { createId } from "@/utils/uid";
import type { Category } from "@/definitions/budgetDefs";

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
  const clearCategories = () => {
    categories.value.forEach((category) => {
      monthlyAllowance.value += category.expense;
      category.expense = 0;
    });
  };

  const getCategoryById = (id: string): Category => {
    const res = ref<Category>(categories.value[0]);
    categories.value.forEach((category) => {
      if (category.id === id) {
        console.log("found category!");
        res.value = category;
      }
    });
    return res.value;
  };
  return {
    categories,
    clearCategories,
    getCategoryById,
    addCategory,
  };
};

const useMonthlyAllowance = () => {
  const updateMonthlyAllowance = () => {
    let res = 0;
    categories.value.forEach((category) => {
      res += category.expense;
    });
    monthlyAllowance.value = res;
  };
  return { monthlyAllowance, updateMonthlyAllowance };
};

export { useGroups, useCategories, useMonthlyAllowance };
