import { computed, onMounted, ref, watch, type Ref } from "vue";
import { createId } from "@/utils/uid";
import type { Category, Group } from "@/definitions/budgetDefs";
import { removeItem } from "@/utils/remove";
import { useAllowance } from "./allowance";
import useFirebase from "@/firebase/firebase";

const { updateGroupsFB, getData, updateMonthlyAllowance } = useFirebase();
const { monthlyAllowance, remaining } = useAllowance();

const groups = ref<Group[]>([]);

const isEditGroupsActive = ref(false);
const groupsUpdated = ref(false);

watch(
  groups,
  () => {
    // console.log("Watch fired!");
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
    // firebase
    updateGroupsFB(groups.value);
  },
  { deep: true }
);

watch(monthlyAllowance, () => {
  console.log("Watch hook fired!");
  remaining.value =
    monthlyAllowance.value -
    groups.value.reduce((acc, group) => {
      group.categories.forEach((category) => {
        acc += category.expense;
      });
      return acc;
    }, 0);
  // firebase
  updateMonthlyAllowance(monthlyAllowance.value);
});

const useGroups = () => {
  const fetchGroups = async () => {
    // rename to fetchData
    if (!groupsUpdated.value) {
      const data = await getData();
      groups.value = data.groups;
      monthlyAllowance.value = data.monthlyAllowance;
      groupsUpdated.value = true;
    }
  };

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
    fetchGroups,
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
    categories.push(data);
  };

  // const updateCategory = (category: Category, isEditActive: Ref<boolean>) => {
  //   if (category.name !== "") {
  //     isEditActive.value = false;
  //   }
  // };

  return {
    addCategory,
    // updateCategory,
  };
};

export { useGroups, useCategories };
