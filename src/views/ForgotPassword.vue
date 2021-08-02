<template>
  <div class="reset-password">
    <Modal
      v-if="modalActive"
      @close-modal="closeModal"
      :modalMessage="modalMessage"
      button="Close"
    />
    <Loading v-if="isLoading" />
    <div class="form-wrap">
      <form class="reset">
        <p class="login-register">
          Back to
          <router-link class="router-link" to="/login">Login</router-link>
        </p>
        <h2>Reset password</h2>
        <p class="login-register">
          Forgot your password? Enter your email to reset it
        </p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <Email class="icon" />
          </div>
        </div>
        <button @click.prevent="resetPassword">Reset</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

import Email from "../assets/Icons/envelope-regular.svg";
import Modal from "../components/Modal.vue";
import Loading from "../components/Loading.vue";
export default {
  name: "ForgotPassword",
  components: {
    Email,
    Modal,
    Loading,
  },
  data() {
    return {
      email: "",
      modalMessage: "",
      modalActive: null,
      isLoading: null,
    };
  },
  methods: {
    closeModal() {
      this.modalActive = !this.modalActive;
      this.email = "";
    },
    resetPassword() {
      this.isLoading = true;
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.isLoading = false;
          this.modalMessage = "Please check your email for further infomation!";
          this.modalActive = true;
        })
        .catch((err) => {
          this.isLoading = false;
          this.modalMessage = err;
          this.modalActive = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped src="@/assets/form/form.scss">
.reset-password {
  position: relative;
  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 8px;
      }
      p {
        margin-bottom: 32px;
        text-align: center;
      }
    }
  }
}
</style>
