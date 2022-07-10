<script setup lang="ts">
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import useFirebase from "@/firebase/firebase";

const email = ref("");
const password = ref("");
const router = useRouter();
const { createUserFB } = useFirebase();

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((userCredential) => {
      console.log("Successfully registered", userCredential.user);
      // firebase
      const data = { email: email.value, password: password.value };
      createUserFB(data);

      router.push("/");
    })
    .catch((error) => {
      console.log("error:", error.code);
    });
};
</script>

<template>
  <h1>Create an Account</h1>
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
