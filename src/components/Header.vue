<script setup lang="ts">
import { useAllowance } from "@/composables/allowance";
import { ref } from "vue";
import ProfileCard from "./profile/ProfileCard.vue";
import ProfileIcon from "./profile/ProfileIcon.vue";

const month = new Date().toLocaleString("en-US", { month: "long" });
const { remaining } = useAllowance();
</script>

<template>
  <ProfileCard />
  <ProfileIcon />
  <div class="header">
    <h1>{{ month }}</h1>
    <div class="monthly-allowance">
      <div>
        <p>${{ remaining }}</p>
      </div>
      <h3>Remaining</h3>
    </div>
  </div>
</template>

<style>
.header {
  display: flex;
  justify-content: space-between;
  color: darkslategray;
  height: 100%;
}
.monthly-allowance {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
</style>
