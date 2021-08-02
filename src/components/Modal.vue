<template>
  <div class="modal">
    <div class="modal-content">
      <p>{{ modalMessage }}</p>
      <div class="actions">
        <button @click="closeModal">{{ button }}</button>
        <button @click="confirm">{{ button2 }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["modalMessage", "button", "button2"],
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
    confirm() {
      this.$emit("confirm");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 8px;
    padding: 40px 30px;
    background-color: #fff;
    p {
      text-align: center;
    }
    .actions {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    button {
      margin: 20px 10px 0 10px;
    }
  }
}
</style>
