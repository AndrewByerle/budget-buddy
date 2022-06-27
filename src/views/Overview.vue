<script setup lang="ts">
import BudgetGroup from "../components/BudgetGroup.vue";
import { useGroups } from "../composables/overview";

const { groups, isEditActive } = useGroups();

const addGroup = () =>
  groups.value.push({
    name: "new group",
    edit: true,
    collapsed: false,
  });
</script>

<template>
  <div>
    <h1>Month</h1>
    <button class="add-group-button" @click="addGroup">Add Group</button>
    <button @click="">Edit</button>
    <button>redo</button>
    <button>undo</button>
    <button>clear</button>
    <template v-for="group in groups">
      <BudgetGroup :group="group" />
    </template>
  </div>
</template>

<style>
.add-group-button {
  background: inherit;
  border-radius: 5px;
  border-width: 2px;
  width: 120px;
  height: 40px;
  font-size: 20px;
}
</style>
