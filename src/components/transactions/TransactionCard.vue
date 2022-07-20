<script setup lang="ts">
import { useCategories, useGroups } from "@/composables/overview";
import useTransactions from "@/composables/transactions";

// const { categories } = useCategories();
const { groups } = useGroups();
const { description, categorySelected, amount, date } = useTransactions();
</script>

<template>
  <div class="transaction-card">
    <div class="row-center">
      <div class="container">
        <div class="row">
          <p>Description</p>
          <input
            type="string"
            v-model="description"
            placeholder="Description"
            class="input"
          />
        </div>
        <div class="row">
          <p>Category</p>
          <select v-model="categorySelected" class="select">
            <option :value="undefined">Please select one</option>
            <template v-for="group in groups">
              <option v-for="category in group.categories" :value="category">
                {{ category.name }}
              </option>
            </template>
          </select>
        </div>
        <div>
          <div class="row">
            <p>Amount</p>
            <input
              type="number"
              v-model="amount"
              placeholder="$Amount"
              class="input"
            />
          </div>
        </div>
        <div class="row">
          <p>Date</p>
          <Datepicker v-model="date" style="width: 44%"></Datepicker>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.input {
  width: 42%;
}

.select {
  width: 44%;
}
.container {
  width: 50%;
}
.row-center {
  margin: 20px;
  border: 1px solid rgb(199, 207, 209);
  display: flex;
  justify-content: center;
  flex-direction: row;
}
.transaction-card {
  background-color: white;
  border: 1px solid #eee;
  border-radius: 10px;
  margin: 3%;
  box-shadow: 2px 2px 5px rgb(188, 231, 218);
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.row {
  display: flex;
  justify-content: space-between;
  padding: 2%;
}
</style>
