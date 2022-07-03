<script setup lang="ts">
import { useCategories } from "@/composables/overview";
import useTransactions from "@/composables/transactions";
import Header from "../components/Header.vue";
import TransactionTable from "../components/transactions/TransactionTable.vue";
import { createId } from "@/utils/uid";
import TransactionCard from "../components/transactions/TransactionCard.vue";

const {
  processTransaction,
  clearTransactions,
  editTransactions,
  categorySelected,
  amount,
  description,
  date,
} = useTransactions();

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US");
};
</script>

<template>
  <Header></Header>
  <button
    class="button"
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
  <button @click="clearTransactions" class="button">clear</button>
  <button @click="editTransactions" class="button">edit</button>

  <TransactionCard />
  <TransactionTable />
</template>

<style>
.button {
  background: inherit;
  border-radius: 5px;
  border-width: 2px;
  font-size: 20px;
}
</style>
