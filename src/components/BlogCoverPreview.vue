<template>
  <div class="modal">
    <div class="modal-content">
      <Close @click="closePreview" class="icon" />
      <img :src="blogPhotoFileURL" alt="" />
    </div>
  </div>
</template>

<script>
import Close from "@/assets/Icons/times-circle-light.svg";
export default {
  components: { Close },
  methods: {
    closePreview() {
      this.$store.commit("OPEN_PHOTO_PREVIEW");
    },
  },
  computed: {
    blogPhotoFileURL() {
      return this.$store.state.blogPhotoFileURL;
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  .modal-content {
    display: flex;
    justify-content: center;
    position: relative;
    border-radius: 12px;
    background-color: #fff;
    // height: 400px;
    // width: 600px;
    padding: 24px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    .icon {
      width: 24px;
      height: auto;
      cursor: pointer;
      font-size: 24px;
      position: absolute;
      top: 15px;
      right: 15px;
      color: #303030;
    }
    img {
      margin-top: 32px;
      display: block;
      width: 200px;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      @media (min-width: 400px) {
        width: 300px;
        height: auto;
      }
      @media (min-width: 800px) {
        width: 500px;
        height: auto;
      }
      @media (min-width: 1200px) {
        width: 600px;
        height: auto;
      }
    }
  }
}
</style>
