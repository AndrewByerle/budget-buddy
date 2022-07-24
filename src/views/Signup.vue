<script setup lang="ts">
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import useFirebase from "@/firebase/firebase";

const email = ref("");
const password = ref("");
const router = useRouter();
const { createUserFB } = useFirebase();

const register = async () => {
  await createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((userCredential) => {
      console.log("Successfully registered", userCredential.user);
      // firebase
      const data = { email: email.value, password: password.value };
      createUserFB(data, userCredential.user.uid);

      router.push("/");
    })
    .catch((error) => {
      console.log("error:", error.code);
    });
};
</script>

<template>
  <div class="center">
    <div class="column">
      <h1>Create an Account</h1>
      <div class="row">
        <label for="email"><b>Email</b></label>
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          v-model="email"
          required
        />
      </div>
      <div class="row">
        <label for="password"><b>Password</b></label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          v-model="password"
          required
        />
      </div>
      <button @click="register" class="button">submit</button>
      <p>Already have an account? <a href="/login">Log In</a></p>
    </div>
  </div>
</template>

<style scoped>
.center {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.column {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 350px;
}
.row {
  display: flex;
  gap: 10px;
}
</style>
