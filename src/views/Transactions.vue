<script setup lang="ts">
import useTransactions from "@/composables/transactions";
import Header from "../components/Header.vue";
import TransactionTable from "../components/transactions/TransactionTable.vue";
import { createId } from "@/utils/uid";
import TransactionCard from "../components/transactions/TransactionCard.vue";
import EditButton from "../components/edit/EditButton.vue";
import { computed, onMounted } from "vue";
import { useBudget } from "@/composables/budget";

const {
  processTransaction,
  clearAllTransactions,
  categorySelected,
  amount,
  description,
  date,
  showDeleteColumn,
  isEditTableActive,
} = useTransactions();

const { fetchData } = useBudget();

onMounted(() => {
  fetchData();
});

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
          id: createId(),
        })
      "
    >
      Add
    </button>
    <div class="gap">
      <EditButton
        @handle-press="showDeleteColumn"
        :is-edit-active="isEditTableActive"
      />
      <button @click="clearAllTransactions" class="button">clear</button>
    </div>
  </div>

  <TransactionCard />
  <TransactionTable />
</template>

<style scoped>
@media only screen and (max-device-width: 480px) {
  .button-row {
    display: flex;
    justify-content: space-around;
    gap: 5px;
  }
}
.gap {
  display: flex;
  gap: 10px;
}
</style>
