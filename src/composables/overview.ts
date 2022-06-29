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
  },
]);

const monthlyAllowance = ref(0);
// const monthlyAllowance = useLocalStorage(0);

const useGroups = () => {
  return { groups };
};

const useCategories = () => {
  return { categories };
};

const useBudget = () => {
  return { monthlyAllowance };
};

export { useGroups, useCategories, useBudget };
