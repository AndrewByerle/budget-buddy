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
  height: 100%;
}

#app {
  margin-top: -0px !important;
}

body,
textarea,
button {
  font-family: arial, sans-serif;
  background-color: rgb(230, 239, 247);
}
html,
body {
  width: 100%;
  overflow-x: hidden;
}
@media only screen and (max-device-width: 480px) {
  .router-view {
    padding-left: 50px;
  }
}
</style>
