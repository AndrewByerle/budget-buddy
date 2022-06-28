<script setup lang="ts">
import LabelRow from "./category/LabelRow.vue";
import Category from "./category/Category.vue";
import { useCategories } from "@/composables/overview";

const { categories } = useCategories();

const addCategory = () => {
  categories.value.push({
    name: "Category",
    assigned: 0,
    spent: 0,
    available: 0,
  });
};
</script>

<template>
  <div class="wrapper">
    <LabelRow @add-category="addCategory" />
    <template v-for="category in categories">
      <Category :category-info="category" />
    </template>
  </div>
</template>

<style>
.wrapper {
  margin: 3%;
}
</style>
