<script setup lang="ts">
import type { Group } from "@/definitions/budgetDefs";
import { ref } from "vue";
import CategoryTable from "./CategoryTable.vue";
const { group } = defineProps<{
  group: Group;
}>();

const vFocus = {
  mounted: (el: any) => el.focus(),
};
</script>

<template>
  <div class="budget-group">
    <div class="group-header">
      <input
        v-focus
        v-if="group.edit"
        v-model="group.name"
        @keyup.enter="group.edit = false"
      />
      <div v-else>
        <p @click="group.edit = true">
          {{ group.name }}
        </p>
      </div>
      <button class="collapse-btn" @click="group.collapsed = !group.collapsed">
        <font-awesome-icon
          icon="fa-solid fa-angle-down"
          style="font-size: 1.5em"
          :class="{ 'rotate-180': !group.collapsed }"
          class="angle-icon"
        />
      </button>
    </div>
    <div v-if="!group.collapsed">
      <CategoryTable />
    </div>
  </div>
</template>

<style>
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
  /* width: 25%; */
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
