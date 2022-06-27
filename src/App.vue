<script setup lang="ts">
import { RouterView } from "vue-router";
import SideNav from "./components/sidenav/SideNav.vue";
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
input,
textarea,
button {
  font-family: arial, sans-serif;
  background-color: rgb(230, 239, 247);
}
/* @media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  } */
</style>
