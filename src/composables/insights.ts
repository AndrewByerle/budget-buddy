import { ref } from "vue";
import { useCategories, useGroups } from "./overview";

const { groups } = useGroups();

export const useInsights = () => {
  const labels = ref<string[]>([]);
  const data = ref<number[]>([]);
  const updateDoughnutChart = () => {
    groups.value.forEach((group) =>
      group.categories.forEach((category) => {
        labels.value.push(category.name);
        data.value.push(category.expense);
      })
    );
  };
  return { updateDoughnutChart, labels, data };
};
