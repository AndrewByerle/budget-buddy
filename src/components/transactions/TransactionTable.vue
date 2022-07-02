<script setup lang="ts">
import useTransactions from "@/composables/transactions";
import TableLite from "vue3-table-lite/ts";

const { table, rowClicked } = useTransactions();
</script>

<template>
  <div class="table">
    <table-lite
      :is-static-mode="true"
      :is-loading="table.isLoading"
      :columns="table.columns"
      :rows="table.rows"
      :rowClasses="table.rowClasses"
      :total="table.totalRecordCount"
      :sortable="table.sortable"
      @is-finished="table.isLoading = false"
      @row-clicked="rowClicked"
    />
  </div>
</template>

<style>
.table {
  margin: 3%;
}
</style>
