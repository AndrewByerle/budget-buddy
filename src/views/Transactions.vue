<script setup lang="ts">
import { useCategories } from "@/composables/overview";
import useTransactions from "@/composables/transactions";
import Header from "../components/Header.vue";
import TransactionTable from "../components/transactions/TransactionTable.vue";
import { createId } from "@/utils/uid";
import TransactionCard from "../components/transactions/TransactionCard.vue";
import EditButton from "../components/edit/EditButton.vue";
import { onMounted } from "vue";

const {
  processTransaction,
  clearAllTransactions,
  categorySelected,
  amount,
  description,
  date,
  editTransactions,
  isEditTableActive,
} = useTransactions();

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US");
};
</script>

<template>
  <Header></Header>
  <div class="button-row">
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
          groupId: categorySelected.groupId,
        })
      "
    >
      Add Transaction
    </button>
    <EditButton
      @handle-press="editTransactions"
      :is-edit-active="isEditTableActive"
    />
    <button @click="clearAllTransactions" class="button">clear</button>
  </div>

  <TransactionCard />
  <TransactionTable />
</template>

<style></style>
