<template>
  <DoughnutChart :chartData="testData" />
</template>

<script setup lang="ts">
import { DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { useInsights } from "@/composables/insights";

Chart.register(...registerables);
const { updateDoughnutChart, labels, data } = useInsights();

updateDoughnutChart();

const testData = {
  labels: labels.value,
  datasets: [
    {
      data: data.value,
      backgroundColor: ["#77CEFF", "#0079AF", "#123E6B", "#97B0C4", "#A5C8ED"],
    },
  ],
};
</script>
