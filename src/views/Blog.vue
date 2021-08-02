<template>
  <div class="blog-card-wrap">
    <div class="blog-cards container">
      <div class="toggle-edit">
        <span>Toggle Editting Post</span>
        <input type="checkbox" v-model="editPost" />
      </div>
      <BlogCard
        v-for="(post, index) in posts"
        :key="index"
        :post="post"
        @onDelete="openModal"
      />
    </div>
    <Modal
      v-if="isActive"
      modalMessage="Are you sure you want to delete this post?"
      button="Close"
      button2="Delete"
      @close-modal="isActive = !isActive"
      @confirm="deletePost"
    />
  </div>
</template>

<script>
import BlogCard from "../components/BlogCard.vue";
import Modal from "../components/Modal.vue";

export default {
  name: "blogs",
  components: {
    BlogCard,
    Modal,
  },
  data() {
    return {
      isActive: null,
      blogId: null,
    };
  },
  methods: {
    openModal(id) {
      this.isActive = true;
      this.blogId = id;
    },
    async deletePost() {
      this.isActive = false;
      await this.$store.dispatch("deletePost", this.blogId);
    },
  },
  computed: {
    posts() {
      return this.$store.state.blogPosts;
    },
    editPost: {
      get() {
        return this.$store.state.editPost;
      },
      set(payload) {
        return this.$store.commit("TOGGLE_EDIT_POST", payload);
      },
    },
  },
  beforeDestroy() {
    this.$store.commit("TOGGLE_EDIT_POST", false);
  },
};
</script>

<style lang="scss" scoped>
.blog-cards {
  position: relative;
  .toggle-edit {
    display: flex;
    align-items: center;
    position: absolute;
    top: -70px;
    right: 0;
    span {
      margin-right: 16px;
    }
  }
}
input[type="checkbox"] {
  position: relative;
  border: none;
  -webkit-appearance: none;
  background: #fff;
  outline: none;
  width: 80px;
  height: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
input[type="checkbox"]:before {
  content: "";
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 20px;
  top: 0;
  left: 0;
  background: #303030;
  transform: scale(1.1);
  transition: 0.75s ease all;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
input:checked[type="checkbox"]:before {
  background: #fff;
  left: 52px;
}
</style>
