<script setup lang="ts">
import useProfile from "./state";

const { toggleProfile } = useProfile();
</script>

<template>
  <button class="profile-button" @click="toggleProfile">
    <font-awesome-icon icon="fa-solid fa-user" class="profile-icon" />
  </button>
</template>

<style>
.profile-button {
  border: none;
  background: inherit;
  right: 0;
  position: absolute;
  z-index: 2;
}

.profile-icon {
  font-size: 2em;
}
</style>
