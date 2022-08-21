<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";

const { to } = defineProps<{
  to: string;
  // title?: string;
  icon?: string;
}>();

const isActive = computed(() => to === useRouter().currentRoute.value.path);
</script>

<template>
  <RouterLink :to="to" class="link-text">
    <div class="nav-item" :class="{ on: isActive }">
      <div class="row">
        <div>
          <font-awesome-icon :icon="icon" class="icon" />
          <template class="page-name">
            <slot></slot>
          </template>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style>
.row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.on {
  background-color: darkgreen;
}
.nav-item {
  color: white;
  text-decoration: none;
  font-size: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 20px;
  height: 40px;
}

.link-text {
  color: white;
  text-decoration: none;
  font-size: 100%;
  padding-top: 20px;
}

.nav-item:hover {
  opacity: 0.8;
  background-color: rgb(56, 223, 159);
}

.icon {
  width: 25px;
  margin-right: 10px;
}
.page-name {
  text-align: center;
  display: inline;
}

@media only screen and (max-device-width: 480px) {
  .page-name {
    display: none;
  }
}
</style>
