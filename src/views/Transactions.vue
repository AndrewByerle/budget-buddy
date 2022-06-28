<script setup lang="ts">
import { useCategories } from "@/composables/overview";
import { ref } from "vue";
import Header from "../components/Header.vue";

const selected = ref("");

const { categories } = useCategories("");

const addTransaction = () => {
  console.log(selected.value);
};
</script>

<template>
  <Header></Header>
  <button class="add-transaction-button" @click="addTransaction">
    New Transaction
  </button>
  <div class="transaction">
    <select v-model="selected">
      <option disabled value="">Please select one</option>
      <template v-for="category in categories">
        <option>
          {{ category.name }}
        </option>
      </template>
    </select>
  </div>
</template>

<style>
.transaction {
  background-color: white;
  border: 1px solid #eee;
  border-radius: 10px;
  margin-top: 3%;
  margin-left: 3%;
  margin-right: 3%;
  box-shadow: 2px 2px 5px rgb(188, 231, 218);
}
.add-transaction-button {
  background: inherit;
  border-radius: 5px;
  border-width: 2px;
  font-size: 20px;
}
</style>
