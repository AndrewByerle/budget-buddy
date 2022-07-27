import { computed, onMounted, ref, watch, type Ref } from "vue";
import { createId } from "@/utils/uid";
import type { Category, Group } from "@/definitions/budgetDefs";
import { removeItem } from "@/utils/remove";
import { useAllowance } from "./allowance";
import useFirebase from "@/firebase/firebase";

const { monthlyAllowance, remaining } = useAllowance();
const { setGroupsFB } = useFirebase();

const groups = ref<Group[]>([]);

const isEditGroupsActive = ref(false);

watch(
  [groups, monthlyAllowance],
  () => {
    remaining.value =
      monthlyAllowance.value -
      groups.value.reduce((acc, group) => {
        group.categories.forEach((category) => {
          let transactionSum = 0;
          category.transactions.forEach((transaction) => {
            transactionSum += transaction.amount;
          });
          category.expense = transactionSum;
          acc += category.expense;
        });
        return acc;
      }, 0);
  },
  { deep: true }
);

// watch(monthlyAllowance, () => {
//   remaining.value =
//     monthlyAllowance.value -
//     groups.value.reduce((acc, group) => {
//       group.categories.forEach((category) => {
//         acc += category.expense;
//       });
//       return acc;
//     }, 0);
// });

const useGroups = () => {
  const deleteGroup = (groupId: string) => {
    groups.value.forEach((group) => {
      if (group.id === groupId) {
        removeItem(groups.value, group);
      }
    });
  };

  const addGroup = () => {
    const id = createId();
    const data = {
      name: "",
      edit: true,
      collapsed: false,
      id: id,
      categories: [],
    };
    //firebase
    setGroupsFB({ groups: groups.value });
    groups.value.push(data);
  };

  const toggleEdit = () => {
    isEditGroupsActive.value = !isEditGroupsActive.value;
  };
  return {
    groups,
    isEditGroupsActive,
    toggleEdit,
    addGroup,
    deleteGroup,
  };
};

const useCategories = () => {
  const addCategory = (categories: Category[]) => {
    const id = createId();
    const data = {
      name: "Edit",
      expense: 0,
      id: id,
      transactions: [],
    };
    //firebase
    // createCategoryFB(groupId, id, data);
    categories.push(data);
  };

  const updateCategory = (category: Category, isEditActive: Ref<boolean>) => {
    if (category.name !== "") {
      isEditActive.value = false;
      //firebase
      const data = { ...category };
      // updateCategoryFB(groupId, category.id, data);
    }
  };

  return {
    addCategory,
    updateCategory,
  };
};

export { useGroups, useCategories };
