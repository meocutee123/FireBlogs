<template>
  <div class="form-wrap">
    <Modal
      v-if="isSuccess"
      @close-modal="closeModal"
      modalMessage="Your account was successfully created!"
      button="Login"
    />
    <Loading v-if="isLoading" />
    <form class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" to="/login">Login</router-link>
      </p>
      <h2>Create your FireBlogs account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="First name" v-model="firstName" />
          <User class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Last name" v-model="lastName" />
          <User class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <Email class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Username" v-model="username" />
          <User class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Password" v-model="password" />
          <Password class="icon" />
        </div>
        <div class="error" v-show="error">{{ errorMsg }}</div>
      </div>

      <button @click.prevent="register">Sign up</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

import Email from "../assets/Icons/envelope-regular.svg";
import Password from "../assets/Icons/lock-alt-solid.svg";
import User from "../assets/Icons/user-alt-light.svg";
import Loading from "../components/Loading.vue";
import Modal from "../components/Modal.vue";

export default {
  components: {
    Email,
    Password,
    User,
    Loading,
    Modal,
  },
  data() {
    return {
      email: "",
      password: "",
      username: "",
      firstName: "",
      lastName: "",
      error: null,
      errorMsg: "",
      isSuccess: null,
      isLoading: null,
    };
  },
  methods: {
    async register() {
      if (
        this.email !== "" &&
        this.password !== "" &&
        this.username !== "" &&
        this.firstName !== "" &&
        this.lastName !== ""
      ) {
        this.error = false;
        this.errorMsg = "";
        this.isLoading = true;
        const createUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password);
        const result = createUser;
        const database = db.collection("users").doc(result.user.uid);
        await database.set({
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          password: this.password,
          username: this.username,
        });
        this.isLoading = false;
        this.isSuccess = true;
        return;
      }
      this.isLoading = false;
      this.error = true;
      this.errorMsg = "Please fill out all the field!";
    },
    closeModal() {
      this.isSuccess = !this.isSuccess;
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped src="@/assets/form/form.scss">
.register {
  h2 {
    max-width: 350px;
  }
}
</style>
