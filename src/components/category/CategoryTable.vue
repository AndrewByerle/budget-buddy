<script setup lang="ts">
import LabelRow from "../category/LabelRow.vue";
import Category from "../category/Category.vue";
import { useCategories } from "@/composables/overview";
import { onMounted, watch } from "vue";
import type { Group } from "@/definitions/budgetDefs";

defineProps<{
  group: Group;
}>();
const { addCategory } = useCategories();
</script>

<template>
  <div class="wrapper">
    <LabelRow @add-category="addCategory(group.categories)" />
    <template v-for="category in group.categories">
      <Category :category-info="category" />
    </template>
  </div>
</template>

<style>
.wrapper {
  margin: 3%;
}
</style>
