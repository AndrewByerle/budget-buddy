import { ref, watch } from "vue";
import { createId } from "@/utils/uid";
import type { Category, Group, Transaction } from "@/definitions/budgetDefs";
import { removeItem } from "@/utils/remove";
import { useAllowance } from "./allowance";
import useFirebase from "@/firebase/firebase";

const { updateGroupsFB, getData, updateMonthlyAllowance } = useFirebase();
const { monthlyAllowance, remaining } = useAllowance();

const groups = ref<Group[]>([]);

const isEditGroupsActive = ref(false);

watch(groups, () => {
  remaining.value = parseFloat(
    (
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
      }, 0)
    ).toFixed(2)
  );
});
watch(
  groups,
  () => {
    updateGroupsFB(groups.value);
  },
  { deep: true }
);

watch(monthlyAllowance, () => {
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

const useBudget = () => {
  const fetchData = async () => {
    await getData(groups);
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
      collapsed: false,
      id: id,
      categories: [],
    };
    groups.value.push(data);
    // updateGroupsFB(groups.value);
  };

  const toggleEditGroups = () => {
    isEditGroupsActive.value = !isEditGroupsActive.value;
  };

  const addCategory = (categories: Category[]) => {
    const id = createId();
    const data = {
      name: "Edit",
      expense: 0,
      id: id,
      transactions: [],
    };
    categories.push(data);
    // updateGroupsFB(groups.value);
  };

  return {
    groups,
    addCategory,
    isEditGroupsActive,
    toggleEditGroups,
    addGroup,
    deleteGroup,
    fetchData,
  };
};

export { useBudget };
