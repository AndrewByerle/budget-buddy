import { computed, ref } from "vue";
import { createId } from "@/utils/uid";
import type { Category, Group } from "@/definitions/budgetDefs";
import { removeItem } from "@/utils/remove";
import { useMonthlyAllowance } from "./allowance";

const { monthlyAllowance } = useMonthlyAllowance();

const groups = ref([
  {
    name: "Car",
    edit: true,
    collapsed: false,
    id: createId(),
  },
]);

const categories = ref<Category[]>([]);

const isEditGroupsActive = ref(false);

const useGroups = () => {
  const deleteGroup = (group: Group): Category[] => {
    const removeCategories = ref<Category[]>([]);
    categories.value.forEach((category) => {
      if (category.groupId == group.id) {
        removeCategories.value.push(category);
        monthlyAllowance.value += category.expense;
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
