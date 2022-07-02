<script setup lang="ts">
import { useCategories } from "@/composables/overview";
import useTransactions from "@/composables/transactions";
import { ref } from "vue";
import Header from "../components/Header.vue";
import TransactionTable from "../components/transactions/TransactionTable.vue";
import { createId } from "@/utils/uid";

const { categories } = useCategories();
const { processTransaction, clearTransactions, editTransactions } =
  useTransactions();
const categorySelected = ref();
const amount = ref();
const description = ref("");
const date = ref();
const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US");
};
</script>

<template>
  <Header></Header>
  <button
    class="add-transaction-button"
    @click="
      processTransaction({
        categoryName: categorySelected.name,
        amount: amount,
        description: description,
        date: formatDate(date),
        categoryId: categorySelected.id,
        id: createId(),
      })
    "
  >
    Add Transaction
  </button>
  <button @click="clearTransactions">clear</button>
  <button @click="editTransactions">edit</button>

  <div class="transaction">
    <div class="card">
      <div class="row">
        <p>Description</p>
        <input type="string" v-model="description" placeholder="Description" />
      </div>
      <div class="row">
        <p>Category</p>
        <select v-model="categorySelected">
          <option :value="undefined">Please select one</option>
          <option v-for="category in categories" :value="category">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div>
        <div class="row">
          <p>Amount</p>
          <div class="amount">
            <input type="number" v-model="amount" placeholder="$Amount" />
          </div>
        </div>
      </div>
      <div class="row">
        <p>date</p>
        <Datepicker v-model="date"></Datepicker>
      </div>
    </div>
  </div>

  <TransactionTable />
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
.row {
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
