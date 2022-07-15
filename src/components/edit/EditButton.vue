<script setup lang="ts">
defineProps<{
  isEditActive: boolean;
}>();

const emit = defineEmits(["handlePress"]);
</script>

<template>
  <button
    :class="{ active: isEditActive }"
    @click="emit('handlePress')"
    class="button"
  >
    Edit
  </button>
</template>

<style>
.active {
  color: white;
  background-color: rgb(49, 179, 129);
}
</style>
