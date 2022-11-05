import { computed, ref, watch } from "vue";
import { createId } from "@/utils/uid";
import type { Category, Group, Transaction } from "@/definitions/budgetDefs";
import { removeItem } from "@/utils/remove";
import { useAllowance } from "./allowance";
import useFirebase from "@/firebase/firebase";

const { updateGroupsFB, getDataFB, updateMonthlyAllowance } = useFirebase();
const { monthlyAllowance, remaining } = useAllowance();

const groups = ref<Group[]>([]);

const currentDate = ref({
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
});

const monthDate = computed(
  () => `${currentDate.value.month + 1}-${currentDate.value.year}`
);
const isEditGroupsActive = ref(false);

watch(
  groups,
  () => {
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
  },
  { deep: true }
);

watch(
  groups,
  () => {
    updateGroupsFB(groups.value, monthDate.value);
  },
  { deep: true }
);

watch(
  monthlyAllowance,
  () => {
    remaining.value =
      monthlyAllowance.value -
      groups.value.reduce((acc, group) => {
        group.categories.forEach((category) => {
          acc += category.expense;
        });
        return acc;
      }, 0);
    // firebase
    updateMonthlyAllowance(monthlyAllowance.value, monthDate.value);
  }
  // { deep: true }
);

const useBudget = () => {
  const fetchData = async () => {
    await getDataFB(groups, monthlyAllowance, monthDate.value);
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
  };

  return {
    groups,
    addCategory,
    isEditGroupsActive,
    toggleEditGroups,
    addGroup,
    deleteGroup,
    fetchData,
    currentDate,
    monthDate,
  };
};

export { useBudget };
