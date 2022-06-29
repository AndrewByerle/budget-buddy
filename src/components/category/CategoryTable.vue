<script setup lang="ts">
import LabelRow from "../category/LabelRow.vue";
import Category from "../category/Category.vue";
import { useCategories } from "@/composables/overview";

const { groupId } = defineProps<{
  groupId: string;
}>();
let { categories } = useCategories();

const addCategory = () => {
  categories.value.push({
    name: "Category",
    expense: 0,
    groupId: groupId,
  });
  console.log(categories.value);
};
</script>

<template>
  <div class="wrapper">
    <LabelRow @add-category="addCategory" />
    <template v-for="category in categories">
      <div v-if="category.groupId === groupId">
        <Category :category-info="category" />
      </div>
    </template>
  </div>
</template>

<style>
.wrapper {
  margin: 3%;
}
</style>
