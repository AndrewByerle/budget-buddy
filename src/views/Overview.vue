<script setup lang="ts">
import BudgetGroup from "../components/BudgetGroup.vue";
import { useGroups } from "../composables/overview";
import Header1 from "../components/Header.vue";

const { groups, addGroup, toggleEdit } = useGroups();
</script>

<template>
  <div>
    <Header1 />
    <div class="button-row">
      <button class="button" @click="addGroup">Add Group</button>
      <button @click="toggleEdit" class="button">Edit</button>
    </div>
    <template v-for="group in groups">
      <BudgetGroup :group="group" />
    </template>
  </div>
</template>

<style>
.button-row {
  display: flex;
  gap: 10px;
  padding-left: 3%;
}
.monthly-allowance {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.button {
  background: inherit;
  border-radius: 5px;
  border-width: 2px;
  height: 40px;
  font-size: 20px;
}
</style>
