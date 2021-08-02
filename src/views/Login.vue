<template>
  <div class="form-wrap">
    <Loading v-if="isLoading" />
    <form class="login">
      <p class="login-register">
        Don't have an account?
        <router-link class="router-link" to="/register">Register</router-link>
      </p>
      <h2>Login to FireBlogs</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <Email class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Password" v-model="password" />
          <Password class="icon" />
        </div>
        <div v-show="error" class="error">{{ errorMsg }}</div>
      </div>
      <router-link class="forgot-password" to="/forgot-password"
        >Forgot your password?</router-link
      >
      <button @click.prevent="signIn">Sign in</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

import Email from "../assets/Icons/envelope-regular.svg";
import Password from "../assets/Icons/lock-alt-solid.svg";
import Loading from "../components/Loading.vue";

export default {
  components: {
    Email,
    Password,
    Loading,
  },
  data() {
    return {
      email: "",
      password: "",
      error: null,
      errorMsg: "",
      isLoading: null,
    };
  },
  methods: {
    signIn() {
      this.isLoading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.error = false;
          this.errorMsg = "";
          this.isLoading = false;
          this.$router.push("/");
        })
        .catch((err) => {
          this.error = true;
          this.errorMsg = err;
          this.isLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped src="@/assets/form/form.scss"></style>
