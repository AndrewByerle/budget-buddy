import { ref } from "vue";
import { useCategories } from "./overview";

const { categories } = useCategories();

export const useInsights = () => {
  const labels = ref<string[]>([]);
  const data = ref<number[]>([]);
  const updateDoughnutChart = () => {
    categories.value.forEach((category) => {
      labels.value.push(category.name);
      data.value.push(category.expense);
    });
  };
  return { updateDoughnutChart, labels, data };
};
