<script setup lang="ts">
import { useCategories } from "@/composables/overview";
import { ref } from "vue";
import Header from "../components/Header.vue";

const { addTransaction, categories } = useCategories();
const categorySelected = ref("");
const amount = ref();
</script>

<template>
  <Header></Header>
  <button
    class="add-transaction-button"
    @click="addTransaction(categorySelected, amount)"
  >
    Add Transaction
  </button>
  <div class="transaction">
    <div class="card">
      <div class="category-select">
        <p>Category</p>
        <select v-model="categorySelected">
          <option disabled value="">Please select one</option>
          <template v-for="category in categories">
            <option>
              {{ category.name }}
            </option>
          </template>
        </select>
      </div>
      <div>
        <div class="category-select">
          <p>Amount</p>
          <div class="amount">
            <input type="number" v-model="amount" placeholder="$Amount" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.card {
  border: 1px solid rgb(232, 240, 243);
  margin: 20px;
}
.amount {
  display: flex;
  background-color: red;
}
.transaction {
  background-color: white;
  border: 1px solid #eee;
  border-radius: 10px;
  margin-top: 3%;
  margin-left: 3%;
  margin-right: 3%;
  box-shadow: 2px 2px 5px rgb(188, 231, 218);
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.category-select {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.add-transaction-button {
  background: inherit;
  border-radius: 5px;
  border-width: 2px;
  font-size: 20px;
}
</style>
