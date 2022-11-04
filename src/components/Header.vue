<script setup lang="ts">
import { useAllowance } from "@/composables/allowance";
import { computed } from "@vue/reactivity";
import { ref, watch } from "vue";
import ProfileCard from "./profile/ProfileCard.vue";
import ProfileIcon from "./profile/ProfileIcon.vue";

const selectedMonth = ref();
const month = ref(new Date().toLocaleString("en-US", { month: "long" }));
const { remaining } = useAllowance();

const getMonthName = (monthNumber: number) => {
  const date = new Date();
  date.setMonth(monthNumber);

  return date.toLocaleString("en-US", { month: "long" });
};

watch(selectedMonth, () => {
  console.log(selectedMonth.value);
  if (selectedMonth.value !== null) {
    month.value = getMonthName(selectedMonth.value.month);
  }
});
</script>

<template>
  <ProfileCard />
  <ProfileIcon />
  <div class="header">
    <div class="month">
      <h1>{{ month }}</h1>
      <div class="monthPicker">
        <Datepicker v-model="selectedMonth" monthPicker />
      </div>
    </div>
    <div class="monthly-allowance">
      <p>${{ remaining }}</p>
    </div>
  </div>
</template>

<style scoped>
.month {
  position: relative;
}
.monthPicker {
  box-shadow: 0 0 6px #1976d2;
  color: #1976d2;
  opacity: 0;
  position: absolute;
  top: 15px;
  z-index: 1;
  display: transparent;
}
.header {
  display: flex;
  justify-content: space-around;
  gap: 30%;
  color: darkslategray;
  height: 100%;
  margin: 3%;
}
.monthly-allowance {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
</style>
