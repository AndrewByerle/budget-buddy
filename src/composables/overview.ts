import { ref } from "vue";

const useGroups = () => {
  const groups = ref([
    {
      name: "Housing",
      edit: false,
      collapsed: true,
    },
  ]);
  const isEditActive = ref(false);
  return { groups, isEditActive };
};

const useCategories = () => {
  const categories = ref([
    {
      name: "Gas",
      assigned: 0,
      spent: 0,
      available: 0,
    },
  ]);
  return categories;
};

export { useGroups, useCategories };
