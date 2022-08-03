<script setup lang="ts">
import { RouterView } from "vue-router";
import SideNav from "./components/sidenav/SideNav.vue";
import { getFirebaseClient } from "./firebase/firebase";

getFirebaseClient();
</script>

<template>
  <SideNav />
  <div class="router-view">
    <RouterView />
  </div>
</template>

<style>
.router-view {
  padding-left: 200px;
}

body,
textarea,
button {
  font-family: arial, sans-serif;
  background-color: rgb(230, 239, 247);
}

html,
body {
  max-width: 100%;
  overflow-x: hidden;
}
</style>
