<script setup lang="ts">
import LinkItem from "./LinkItem.vue";
</script>

<template>
  <div class="sidebar">
    <h1>Budget Buddy</h1>
    <LinkItem to="/" title="Overview" icon="fa-solid fa-house" />
    <LinkItem to="/transactions" title="Transactions" icon="fa-solid fa-list" />
  </div>
</template>

<style>
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
</style>
