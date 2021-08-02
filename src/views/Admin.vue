<template>
  <div class="admin">
    <Modal
      v-if="modalActive"
      @close-modal="closeModal"
      :modalMessage="modalMessage"
      button="Close"
    />
    <Loading v-if="isLoading" />
    <div class="container">
      <h2>Adminstration</h2>
      <div class="admin-info">
        <h2>Add admin</h2>
        <div class="input">
          <input
            type="text"
            placeholder="Enter user emal to make them an Admin"
            v-model="adminEmail"
          />
        </div>
        <span>{{ msg }}</span>
        <button @click="addAdmin">Submit</button>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from "../components/Loading.vue";
import Modal from "../components/Modal.vue";

import db from "../firebase/firebaseInit";
export default {
  components: { Modal, Loading },
  data() {
    return {
      adminEmail: "",
      isLoading: null,
      modalActive: null,
      modalMessage: "",
      msg: "",
    };
  },
  methods: {
    async addAdmin() {
      if (this.adminEmail === "") return;
      this.isLoading = true;
      const userRef = db.collection("users");
      const result = await userRef.where("email", "==", this.adminEmail).get();
      if (result.empty) {
        this.isLoading = false;
        this.modalMessage = "Make sure you entered the right user email!";
        this.modalActive = true;
        this.adminEmail = "";
        return;
      }
      const docId = result.docs.map((doc) => doc.id)[0];
      userRef.doc(docId).update({
        isAdmin: true,
      });
      this.isLoading = false;
      this.modalMessage = "Admin added successfully!";
      this.adminEmail = "";
      this.modalActive = true;
    },
    closeModal() {
      this.modalActive = !this.modalActive;
    },
  },
};
</script>

<style lang="scss" scoped>
.admin {
  .container {
    max-width: 1000px;
    padding: 60px 25px;
    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 200;
      font-size: 32px;
    }
    .admin-info {
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;
      span {
        font-size: 14px;
      }
      .input {
        margin: 16px 0;
        label {
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;
          &:focus {
            outline: none;
          }
        }
      }
      button {
        align-self: center;
      }
    }
  }
}
</style>
