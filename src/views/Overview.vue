<script setup lang="ts">
import { useGroups } from "../composables/overview";
import Header1 from "../components/Header.vue";
import BudgetGroup from "@/components/groups/BudgetGroup.vue";
import EditButton from "../components/edit/EditButton.vue";
import { onBeforeUpdate, onMounted, onUnmounted, onUpdated, watch } from "vue";

const {
  groups,
  addGroup,
  toggleEdit,
  isEditGroupsActive,
  getGroupsAndCategories,
} = useGroups();

onMounted(async () => {
  await getGroupsAndCategories();
});
</script>

<template>
  <div>
    <Header1 />
    <div class="button-row">
      <button class="button" @click="addGroup">Add Group</button>
      <EditButton
        @handle-press="toggleEdit"
        :is-edit-active="isEditGroupsActive"
      />
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
  /* background: inherit; */
  border-radius: 5px;
  border-width: 2px;
  height: 40px;
  font-size: 20px;
}
.edit {
  background-color: rgb(49, 179, 129);
  color: white;
}
</style>
