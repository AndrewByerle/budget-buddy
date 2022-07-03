import { computed, ref } from "vue";
import { createId } from "@/utils/uid";
import type { Category, Group } from "@/definitions/budgetDefs";
import { removeItem } from "@/utils/remove";
// import useTransactions from "./transactions";
import { useMonthlyAllowance } from "./allowance";
import { remove } from "@vue/shared";

const { monthlyAllowance } = useMonthlyAllowance();
// const { transactions } = useTransactions();

const groups = ref([
  {
    name: "Car",
    edit: true,
    collapsed: false,
    id: createId(),
  },
]);

const categories = ref<Category[]>([
  // {
  //   name: "Ex. Gas",
  //   expense: 0,
  //   groupId: groups.value[0].id,
  //   id: createId(),
  // },
]);

// const monthlyAllowance = useLocalStorage("monthly_allowance", 45);

const isEditGroupsActive = ref(false);

const useGroups = () => {
  const deleteGroup = (group: Group): Category[] => {
    const removeCategories = ref<Category[]>([]);
    categories.value.forEach((category) => {
      if (category.groupId == group.id) {
        removeCategories.value.push(category);
        // console.log(transactions.value);
      }
    });
    removeCategories.value.forEach((element) =>
      removeItem(categories.value, element)
    );
    removeItem(groups.value, group);
    return removeCategories.value;
  };
  const addGroup = () =>
    groups.value.push({
      name: "",
      edit: true,
      collapsed: false,
      id: createId(),
    });

  const toggleEdit = () => {
    isEditGroupsActive.value = !isEditGroupsActive.value;
  };
  return { groups, isEditGroupsActive, toggleEdit, addGroup, deleteGroup };
};

const useCategories = () => {
  const addCategory = (groupId: string) => {
    categories.value.push({
      name: "Category",
      expense: 0,
      groupId: groupId,
      id: createId(),
    });
    // console.log(categories.value);
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

export { useGroups, useCategories };
