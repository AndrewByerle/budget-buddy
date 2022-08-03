<script setup lang="ts">
import { useGroups } from "@/composables/overview";
import type { Group } from "@/definitions/budgetDefs";
import { computed, onMounted, ref, watch } from "vue";
import CategoryTable from "../category/CategoryTable.vue";

const { group } = defineProps<{
  group: Group;
}>();

const vFocus = {
  mounted: (el: any) => el.focus(),
};
const { isEditGroupsActive, deleteGroup } = useGroups();

const isEditActive = ref(false);
</script>

<template>
  <div class="budget-group">
    <div class="group-header">
      <input
        v-if="isEditActive"
        v-focus
        v-model.lazy="group.name"
        @keyup.enter="isEditActive = false"
      />
      <div v-else-if="group.name === ``">
        <p @click="isEditActive = true">Edit</p>
      </div>
      <div v-else>
        <p @click="isEditActive = true">
          {{ group.name }}
        </p>
      </div>
      <button
        v-if="isEditGroupsActive"
        class="collapse-btn"
        @click="deleteGroup(group.id)"
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
      <CategoryTable :group="group" />
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
  z-index: 0.1;
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
