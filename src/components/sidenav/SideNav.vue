<script setup lang="ts">
import LinkItem from "./LinkItem.vue";

const overviewLabel = "Overview";
const transactionsLabel = "Transactions";
const insightsLabel = "Insights";
</script>

<template>
  <div class="sidebar">
    <h1 class="name">Budget Buddy</h1>
    <LinkItem to="/" title="Overview" icon="fa-solid fa-house">{{
      overviewLabel
    }}</LinkItem>
    <LinkItem to="/transactions" title="Transactions" icon="fa-solid fa-list">{{
      transactionsLabel
    }}</LinkItem>
    <LinkItem to="/insights" title="Insights" icon="fa-solid fa-chart-pie">
      {{ insightsLabel }}</LinkItem
    >
  </div>
</template>

<style scoped>
.sidebar {
  color: white;
  height: 100%;
  width: 200px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgb(49, 179, 129);
  overflow-x: hidden;
  padding-top: 20px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  text-align: center;
}

@media only screen and (max-device-width: 480px) {
  .sidebar {
    width: 120px;
  }
  .name {
    font-size: 5vw;
  }
}
</style>
