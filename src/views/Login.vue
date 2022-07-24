<script setup lang="ts">
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const logIn = () => {
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
  <div class="center">
    <div class="column">
      <h1>Log In</h1>
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
      <button @click="logIn" class="button">submit</button>
      <a href="/signup">Signup</a>
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
