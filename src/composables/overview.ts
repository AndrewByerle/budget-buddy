import useLocalStorage from "@/components/LocalStorage";
import { createConditionalExpression } from "@vue/compiler-core";
import { createDOMCompilerError } from "@vue/compiler-dom";
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
const useGroups = () => {
  return { groups };
};

const categories = ref([
  {
    name: "Ex. Gas",
    assigned: 0,
    spent: 0,
    available: 0,
    groupId: groups.value[0].id,
  },
]);
const useCategories = (groupId: string) => {
  // todo returns all cat with that groupid

  return { categories: categories };
};

const monthlyAllowance = ref(0);
// const monthlyAllowance = useLocalStorage(0);

const useBudget = () => {
  return { monthlyAllowance };
};

export { useGroups, useCategories, useBudget };
