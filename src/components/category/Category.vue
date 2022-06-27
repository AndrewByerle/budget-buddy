<!-- A single row in the category table -->
<script setup lang="ts">
import type { Category } from "@/definitions/budgetDefs";

defineProps<{
  categoryInfo: Category;
}>();
</script>

<template>
  <div class="table-row">
    <div class="item">
      <p>{{ categoryInfo.name }}</p>
    </div>
    <div class="item">
      <p>{{ categoryInfo.assigned }}</p>
    </div>
    <div class="item">
      <p>{{ categoryInfo.spent }}</p>
    </div>
    <div class="item">
      <p>{{ categoryInfo.available }}</p>
    </div>
  </div>
</template>

<style>
.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
.item {
  background-color: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  color: black;
  line-height: 1;
  font-weight: 200;
  cursor: pointer;
  transition: all 0.3s ease;
  border-color: black;
  box-shadow: 2px 2px 2px rgb(200, 207, 205);

  /* border: 1px solid black; */
}
</style>
