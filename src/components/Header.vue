<script setup lang="ts">
import { useBudget } from "@/composables/overview";
import { ref } from "vue";

const month = new Date().toLocaleString("en-US", { month: "long" });
const { monthlyAllowance } = useBudget();
const isEditActive = ref(false);
</script>

<template>
  <div class="header">
    <h1>{{ month }}</h1>
    <div class="monthly-allowance">
      <input
        type="number"
        v-if="isEditActive"
        v-model="monthlyAllowance"
        @keyup.enter="isEditActive = false"
      />
      <div v-else>
        <p @click="isEditActive = true">${{ monthlyAllowance }}</p>
      </div>
      <!-- <p>{{ monthlyAllowance }}</p> -->
      <h3>Monthly Allowance</h3>
    </div>
  </div>
</template>

<style>
.header {
  display: flex;
  justify-content: space-between;
  color: darkslategray;
  height: 100%;
}
.monthly-allowance {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
</style>
