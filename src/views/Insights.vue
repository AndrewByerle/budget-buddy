<template>
  <DoughnutChart :chartData="testData" />
  <h1 v-if="!data.length">No Data</h1>
</template>

<script setup lang="ts">
import { DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { onMounted, ref } from "vue";
import { useGroups } from "@/composables/overview";
import { computed } from "@vue/reactivity";

const { groups, fetchGroups } = useGroups();

const labels = ref<string[]>([]);
const data = ref<number[]>([]);
onMounted(async () => {
  await fetchGroups();

  groups.value.forEach((group) =>
    group.categories.forEach((category) => {
      labels.value.push(category.name);
      data.value.push(category.expense);
    })
  );
});

Chart.register(...registerables);

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
