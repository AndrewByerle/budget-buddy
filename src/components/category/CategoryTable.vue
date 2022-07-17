<script setup lang="ts">
import LabelRow from "../category/LabelRow.vue";
import Category from "../category/Category.vue";
import { useCategories } from "@/composables/overview";
import { onMounted, watch } from "vue";

const { groupId } = defineProps<{
  groupId: string;
}>();
const { categories, addCategory } = useCategories();
</script>

<template>
  <div class="wrapper">
    <LabelRow @add-category="addCategory(groupId)" />
    <template v-for="category in categories">
      <div v-if="category.groupId === groupId">
        <Category :category-info="category" :group-id="groupId" />
      </div>
    </template>
  </div>
</template>

<style>
.wrapper {
  margin: 3%;
}
</style>
