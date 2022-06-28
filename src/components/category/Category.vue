<!-- A single row in the category table -->
<script setup lang="ts">
import { useBudget } from "@/composables/overview";
import type { Category } from "@/definitions/budgetDefs";
import { ref } from "vue";

const { categoryInfo } = defineProps<{
  categoryInfo: Category;
}>();

const { monthlyAllowance } = useBudget();

const spentHistory = { old: 0, recent: 0 };

const handleSpentInput = (e: any) => {
  isEditActive.value = false;
  spentHistory.old = spentHistory.recent;
  spentHistory.recent = e.target.valueAsNumber;
  monthlyAllowance.value += spentHistory.old - spentHistory.recent;
};

const isEditActive = ref(true);
// Didn't componentize each item becuase @keyup.enter event isn't passed to child
</script>

<template>
  <div class="table-row">
    <div class="item">
      <input
        v-if="isEditActive"
        v-model="categoryInfo.name"
        @keyup.enter="isEditActive = false"
      />
      <div v-else>
        <p @click="isEditActive = true">
          {{ categoryInfo.name }}
        </p>
      </div>
    </div>
    <!-- <div class="item">
      <input
        v-if="isEditActive"
        v-model="categoryInfo.assigned"
        @keyup.enter="isEditActive = false"
      />
      <div v-else>
        <p @click="isEditActive = true">${{ categoryInfo.assigned }}</p>
      </div>
    </div> -->
    <div class="item">
      <input
        v-if="isEditActive"
        type="number"
        v-model="categoryInfo.spent"
        @keyup.enter="handleSpentInput"
      />
      <div v-else>
        <p @click="isEditActive = true">${{ categoryInfo.spent }}</p>
      </div>
    </div>
    <!-- <div class="item">
      <input
        v-if="isEditActive"
        v-model="categoryInfo.available"
        @keyup.enter="isEditActive = false"
      />
      <div v-else>
        <p @click="isEditActive = true">${{ categoryInfo.available }}</p>
      </div>
    </div> -->
  </div>
</template>

<style>
.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* 1fr 1fr; */
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
