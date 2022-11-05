<script setup lang="ts">
import { useAllowance } from "@/composables/allowance";
import { useBudget } from "@/composables/budget";
import useFirebase from "@/firebase/firebase";
import { watch } from "vue";
import ProfileCard from "./profile/ProfileCard.vue";
import ProfileIcon from "./profile/ProfileIcon.vue";

const { remaining } = useAllowance();
const { currentDate, fetchData } = useBudget();

const getMonthName = (monthNumber: number) => {
  const date = new Date();
  date.setMonth(monthNumber);
  return date.toLocaleString("en-US", { month: "long" });
};

watch(currentDate, () => {
  fetchData();
});
</script>

<template>
  <ProfileCard />
  <ProfileIcon />
  <div class="header">
    <div class="month">
      <h1>{{ getMonthName(currentDate.month) }}</h1>
      <div class="monthPicker">
        <Datepicker v-model="currentDate" monthPicker />
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
