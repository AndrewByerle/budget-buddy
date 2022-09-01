<script setup lang="ts">
import { useAllowance } from "@/composables/allowance";
import { computed, onMounted, ref } from "vue";
import useProfile from "./state";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import useFirebase from "@/firebase/firebase";

const { showProfile } = useProfile();
const { monthlyAllowance } = useAllowance();
const { getCurrentUser } = useFirebase();
const router = useRouter();

const logOut = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log("Signed Out");
      router.push("/login");
    })
    .catch((error) => {
      console.log(error);
    });
};
let user = ref();
onMounted(async () => (user.value = await getCurrentUser()));
</script>

<template>
  <div class="profile" :class="{ profileUnhidden: showProfile }">
    <div class="hidden" :class="{ column: showProfile }">
      <div class="profile-item">
        <p>Email</p>
        <div class="email">
          {{ user?.email }}
        </div>
      </div>
      <div class="profile-item">
        <p>Monthly Allowance</p>
        <input v-model.lazy="monthlyAllowance" type="number" />
      </div>
      <button class="button" @click="logOut">log out</button>
    </div>
  </div>
</template>

<style scoped>
.hidden {
  display: none;
}
.email {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
input {
  width: 40%;
}
.profile-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.column {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
.profile {
  background-color: white;
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 0px;
  height: 0px;
  margin-top: -5px;
  float: right;
  position: absolute;
  right: 10px;
  transition: 1s;
  background-color: inherit;
}
.profileUnhidden {
  background-color: white;
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 300px;
  height: 500px;
  margin-top: -5px;
  float: right;
  position: absolute;
  right: 10px;
  transition: 1s;
  border: 2px solid gray;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  z-index: 1;
}
</style>
