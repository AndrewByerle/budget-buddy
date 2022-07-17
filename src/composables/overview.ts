import { computed, onMounted, ref, watch, type Ref } from "vue";
import { createId } from "@/utils/uid";
import type { Category, Group } from "@/definitions/budgetDefs";
import { removeItem } from "@/utils/remove";
import { useMonthlyAllowance } from "./allowance";
import useFirebase from "@/firebase/firebase";

const { monthlyAllowance } = useMonthlyAllowance();
const {
  getGroupsFB,
  createGroupFB,
  createCategoryFB,
  updateCategoryFB,
  getCategoriesFB,
  isLoggedIn,
} = useFirebase();

const groups = ref<Group[]>([]);

const categories = ref<Category[]>([]);

const isEditGroupsActive = ref(false);

const useGroups = () => {
  const getGroupsAndCategories = async () => {
    await getCategoriesFB(categories);
    await getGroupsFB(groups);
  };

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

  const addGroup = () => {
    const id = createId();
    const data = {
      name: "",
      edit: true,
      collapsed: false,
      id: id,
    };
    //firebase
    createGroupFB(id, data);
    groups.value.push(data);
  };

  const toggleEdit = () => {
    isEditGroupsActive.value = !isEditGroupsActive.value;
  };
  return {
    groups,
    getGroupsAndCategories,
    isEditGroupsActive,
    toggleEdit,
    addGroup,
    deleteGroup,
  };
};

const useCategories = () => {
  const addCategory = (groupId: string) => {
    const id = createId();
    const data = {
      name: "Category",
      expense: 0,
      groupId: groupId,
      id: id,
    };
    //firebase
    createCategoryFB(groupId, id, data);
    categories.value.push(data);
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
  const updateCategory = (
    category: Category,
    isEditActive: Ref<boolean>,
    groupId: string
  ) => {
    if (category.name !== "") {
      isEditActive.value = false;

      //firebase
      const data = { ...category };
      updateCategoryFB(groupId, category.id, data);
    }
  };

  return {
    categories,
    clearCategories,
    addCategory,
    increaseCategoryExpense,
    updateCategory,
  };
};

export { useGroups, useCategories };
