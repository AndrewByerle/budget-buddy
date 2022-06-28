<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import BudgetGroup from "../components/BudgetGroup.vue";
import { useBudget, useGroups } from "../composables/overview";
import Header1 from "../components/Header.vue";
import { createId } from "@/utils/uid";

const { groups } = useGroups();

const addGroup = () =>
  groups.value.push({
    name: "new group",
    edit: true,
    collapsed: false,
    id: createId(),
  });
</script>

<template>
  <div>
    <Header1 />
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
.monthly-allowance {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.add-group-button {
  background: inherit;
  border-radius: 5px;
  border-width: 2px;
  width: 120px;
  height: 40px;
  font-size: 20px;
}
</style>
