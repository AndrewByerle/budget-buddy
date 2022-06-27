<script setup lang="ts">
import LabelRow from "./category/LabelRow.vue";
import Category from "./category/Category.vue";
import { useCategories } from "@/composables/overview";

const categories = useCategories();
</script>

<template>
  <div class="wrapper">
    <LabelRow />
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
