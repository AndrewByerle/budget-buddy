<!-- A single row in the category table -->
<script setup lang="ts">
import type { Category } from "@/definitions/budgetDefs";
import { onMounted, ref } from "vue";

const { category } = defineProps<{
  category: Category;
}>();

const isEditActive = ref(false);
</script>

<template>
  <div class="table-row">
    <div class="item">
      <input
        v-if="isEditActive"
        v-model.lazy="category.name"
        @keyup.enter="isEditActive = false"
      />

      <div v-else-if="category.name === ``">
        <p @click="isEditActive = true">Edit</p>
      </div>
      <div v-else>
        <p @click="isEditActive = true">
          {{ category.name }}
        </p>
      </div>
    </div>
    <div class="item">
      <p>${{ category.expense.toFixed(0) }}</p>
    </div>
  </div>
</template>

<style>
.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
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
}
</style>
