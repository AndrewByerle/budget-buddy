<script setup lang="ts">
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const register = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Successfully logged in");
      router.push("/");
    })
    .catch((error) => {
      console.log(error.code);
    });
};
</script>

<template>
  <h1>Log in</h1>
  <label for="email"><b>Email</b></label>
  <input
    type="text"
    placeholder="Enter Email"
    name="email"
    v-model="email"
    required
  />

  <label for="password"><b>Password</b></label>
  <input
    type="password"
    placeholder="Enter Password"
    name="password"
    v-model="password"
    required
  />
  <button @click="register">submit</button>
</template>
