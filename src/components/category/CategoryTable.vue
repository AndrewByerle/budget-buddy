<script setup lang="ts">
import LabelRow from "../category/LabelRow.vue";
import Category from "../category/Category.vue";
import type { Group } from "@/definitions/budgetDefs";
import { useBudget } from "@/composables/overview";

defineProps<{
  group: Group;
}>();
const { addCategory } = useBudget();
</script>

<template>
  <div class="wrapper">
    <LabelRow @add-category="addCategory(group.categories)" />
    <template v-for="category in group.categories">
      <Category :category="category" />
    </template>
  </div>
</template>

<style scoped>
.wrapper {
  margin: 3%;
}
</style>
