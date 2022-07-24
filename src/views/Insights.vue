<template>
  <DoughnutChart :chartData="testData" />
  <h1 v-if="!data.length">No Data</h1>
</template>

<script setup lang="ts">
import { DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { ref } from "vue";
import { useGroups } from "@/composables/overview";

const { groups } = useGroups();

Chart.register(...registerables);

const labels: string[] = [];
const data: number[] = [];
groups.value.forEach((group) =>
  group.categories.forEach((category) => {
    labels.push(category.name);
    data.push(category.expense);
  })
);

const testData = {
  labels: labels,
  datasets: [
    {
      data: data,
      backgroundColor: ["#77CEFF", "#0079AF", "#123E6B", "#97B0C4", "#A5C8ED"],
    },
  ],
};
</script>
