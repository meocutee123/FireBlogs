<template>
  <div class="profile" v-if="currentUser">
    <Modal
      v-if="modalActive"
      button="Close"
      :modalMessage="modalMsg"
      @close-modal="closeModal"
    />
    <div class="container">
      <h2>Account Settings</h2>
      <div class="profile-info">
        <div class="initials">{{ $store.state.profileInitials }}</div>
        <div v-if="admin" class="admin-badge">
          <AdminIcon class="icon" />
          <span>Admin</span>
        </div>
        <div class="input">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="currentUser.firstName" />
        </div>
        <div class="input">
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="currentUser.lastName" />
        </div>
        <div class="input">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="currentUser.username" />
        </div>
        <div class="input">
          <label for="email">Email:</label>
          <input disabled type="text" id="email" v-model="currentUser.email" />
        </div>
        <button @click="saveChange">Save changes</button>
      </div>
    </div>
  </div>
</template>

<script>
import AdminIcon from "../assets/Icons/user-crown-light.svg";
import Modal from "../components/Modal.vue";
import { mapState } from "vuex";
export default {
  components: { AdminIcon, Modal },
  data() {
    return {
      modalMsg: "Changes are saved!",
      modalActive: null,
    };
  },
  methods: {
    closeModal() {
      this.modalActive = !this.modalActive;
    },
    async saveChange() {
      await this.$store.dispatch("updateUserSettings");
      this.modalActive = true;
    },
  },
  computed: {
    ...mapState(["currentUser"]),
    admin() {
      return this.$store.state.profileAdmin;
    },
  },
};
</script>

<style lang="scss" scoped>
.profile .container {
  max-width: 1000px;
  padding: 60px 25px;
  h2 {
    text-align: center;
    margin-bottom: 16px;
    font-weight: 300;
    font-size: 32px;
  }
  .profile-info {
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    padding: 32px;
    background-color: #f1f1f1f1;
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: 32px auto;
    .initials {
      position: initial;
      width: 80px;
      height: 80px;
      font-size: 32px;
      background-color: #303030;
      border-radius: 50%;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      align-self: center;
    }
    .admin-badge {
      display: flex;
      align-self: center;
      color: #fff;
      font-size: 14px;
      padding: 8px 24px;
      border-radius: 8px;
      background-color: #303030;
      margin: 16px 0;
      text-align: center;
      text-transform: uppercase;
      .icon {
        width: 14px;
        height: auto;
        margin-right: 8px;
      }
    }
    input {
      width: 100%;
      border: none;
      background-color: #f2f7f6;
      padding: 8px;
      height: 50px;
      @media (min-width: 900px) {
      }
      &:focus {
        outline: none;
      }
    }
    button {
      align-self: center;
    }
  }
}
</style>
