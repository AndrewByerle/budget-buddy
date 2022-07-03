<script setup lang="ts">
import { useGroups } from "@/composables/overview";
import useTransactions from "@/composables/transactions";
import type { Group } from "@/definitions/budgetDefs";
import CategoryTable from "./category/CategoryTable.vue";
const { group } = defineProps<{
  group: Group;
}>();

const vFocus = {
  mounted: (el: any) => el.focus(),
};
const { isEditGroupsActive } = useGroups();
const { deleteGroupTransactions } = useTransactions();

const handleGroupInput = () => {
  if (group.name !== "") {
    group.edit = false;
  }
};
</script>

<template>
  <div class="budget-group">
    <div class="group-header">
      <input
        v-focus
        v-if="group.edit"
        v-model="group.name"
        @keyup.enter="handleGroupInput"
      />
      <div v-else>
        <p @click="group.edit = true">
          {{ group.name }}
        </p>
      </div>
      <button
        v-if="isEditGroupsActive"
        class="collapse-btn"
        @click="deleteGroupTransactions(group)"
      >
        <font-awesome-icon icon="fa-solid fa-xmark" class="x-icon group-icon" />
      </button>
      <button
        v-else
        class="collapse-btn"
        @click="group.collapsed = !group.collapsed"
      >
        <font-awesome-icon
          icon="fa-solid fa-angle-down"
          :class="{ 'rotate-180': !group.collapsed }"
          class="angle-icon group-icon"
        />
      </button>
    </div>
    <div v-if="!group.collapsed">
      <CategoryTable :group-id="group.id" />
    </div>
  </div>
</template>

<style>
.x-icon {
  color: red;
}
.group-icon {
  font-size: 1.5em;
}
.angle-icon {
  transition: 0.2s linear;
}
.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
.collapsed {
  transition: 0.2s ease;
}
.collapse-btn {
  background: inherit;
  border: none;
}
.group-header {
  display: flex;
  justify-content: space-between;
  padding: 1%;
  /* transition: 0.2s ease; */
}
.budget-group {
  background-color: white;
  border: 1px solid #eee;
  border-radius: 10px;
  margin-top: 3%;
  margin-left: 3%;
  margin-right: 3%;
  box-shadow: 2px 2px 5px rgb(188, 231, 218);
}
</style>
