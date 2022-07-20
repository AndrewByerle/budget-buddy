<script setup lang="ts">
const emit = defineEmits(["addCategory"]);
</script>

<template>
  <div class="table-row">
    <div class="labels">
      <div class="plus-icon" @click="emit('addCategory')">
        <font-awesome-icon icon="fa-solid fa-circle-plus" />
      </div>
      <p>Category</p>
    </div>
    <div class="labels">
      <p>Expense</p>
    </div>
  </div>
</template>

<style>
.plus-icon {
  padding-top: 15px;
  padding-right: 5px;
  color: rgb(137, 152, 158);
}
.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* 1fr 1fr; */
}
.labels {
  display: flex;
  justify-content: center;
  color: black;
  background-color: rgb(219, 226, 233);
  line-height: 1;
  font-weight: 200;
  cursor: pointer;
  transition: all 0.3s ease;
  border-color: black;
}
.labels:first-child {
  border-top-left-radius: 30px;
  border-bottom-left-radius: 0px;
}
.labels:last-child {
  border-top-right-radius: 30px;
  border-bottom-right-radius: 0px;
}
</style>
