<template>
  <div class="create-post">
    <BlogCoverPreview v-if="$store.state.blogPhotoPreview" />
    <div class="container">
      <div :class="{ invisible: !error }" class="error-msg">
        <p>
          <span>Error: {{ errorMsg }}</span>
        </p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter blog title" v-model="blogTitle" />
        <div class="upload-file">
          <label for="blogPhoto">Upload cover photo</label>
          <input
            @change="fileChange"
            type="file"
            ref="blogPhoto"
            id="blogPhoto"
            accept=".png, .jpg, .jpeg"
          />
          <button
            @click="$store.commit('OPEN_PHOTO_PREVIEW')"
            class="preview"
            :class="{ 'button-inactive': !$store.state.blogPhotoFileURL }"
          >
            Preview photo
          </button>
          <span>File chosen: {{ $store.state.blogPhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <vue-editor
          :editorOptions="editorSettings"
          v-model="blogHTML"
          useCustomImageHandler
          @image-added="imageHandler"
        />
      </div>
      <div class="blog-actions">
        <button @click="onUpload">Public post</button>
        <router-link to="/blog-preview" class="router-button"
          >Post preview</router-link
        >
      </div>
    </div>
    <Loading v-if="isLoading" />
  </div>
</template>

<script>
import Quill from "quill";
window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;

Quill.register("modules/imageResize", ImageResize);

import firebase from "firebase/app";
import db from "../firebase/firebaseInit";
import "firebase/storage";

import Loading from "../components/Loading.vue";
import BlogCoverPreview from "../components/BlogCoverPreview.vue";
export default {
  name: "CreatePost",
  components: {
    BlogCoverPreview,
    Loading,
  },
  data() {
    return {
      error: null,
      errorMsg: null,
      isLoading: null,
      editorSettings: {
        modules: {
          imageResize: {},
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ header: 1 }, { header: 2 }],
            [
              { align: "" },
              { align: "center" },
              { align: "right" },
              { align: "justify" },
            ],
            ["blockquote"],
            [("blockquote", "code-block")],

            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],

            [{ color: [] }, { background: [] }],

            ["clean"],
            ["image", "video"],
          ],
        },
      },
    };
  },

  methods: {
    fileChange(e) {
      const file = e.target.files[0];
      const fileName = file.name;
      this.$store.commit("FILE_NAME_CHANGE", fileName);
      this.$store.commit("SET_FILE", file);
      this.$store.commit("CREATE_FILE_URL", URL.createObjectURL(file));
    },
    async imageHandler(file, editor, cursorLocation, resetUploader) {
      const storageRef = firebase.storage().ref();
      const docRef = storageRef.child(
        `documents/blogPostPhotos/${Date.now() + file.name}`
      );
      await docRef.put(file);
      const downloadURL = await docRef.getDownloadURL();
      editor.insertEmbed(cursorLocation, "image", downloadURL);
      resetUploader();
    },
    async onUpload() {
      if (this.checkValidation([this.blogTitle, this.blogHTML])) {
        if (this.file) {
          this.uploadBlog();
          return;
        }
        this.errorMsg = "Please ensure you uploaded a cover photo!";
        this.error = true;
        setTimeout(() => (this.error = false), 5000);
        return;
      }
      this.error = true;
      this.errorMsg = "Please ensure Blog Title & Blog Post has been filled!";
      setTimeout(() => (this.error = false), 5000);
      return;
    },
    uploadBlog() {
      this.isLoading = true;
      const storageRef = firebase.storage().ref();
      const docRef = storageRef.child(
        `documents/BlogCoverPhotos/${Date.now() +
          this.$store.state.blogPhotoName}`
      );
      docRef.put(this.file).on(
        "state_change",
        () => {},
        () => (this.isLoading = false),
        async () => {
          const downloadURL = await docRef.getDownloadURL();
          const timestamp = Date.now();
          const dataBase = db.collection("blogPosts").doc();
          await dataBase.set({
            blogId: dataBase.id,
            blogHTML: this.blogHTML,
            blogCoverPhoto: downloadURL,
            blogCoverPhotoName: this.blogCoverPhotoName,
            blogTitle: this.blogTitle,
            profileId: this.profileId,
            date: timestamp,
          });
          this.isLoading = false;
          this.$router.push({
            name: "ViewBlog",
            params: { id: dataBase.id },
          });
          this.$store.commit("CLEAR_STATE");
        }
      );
    },
    async updateBlog() {
      this.isLoading = true;
      const timestamp = Date.now();
      const dataBase = db.collection("blogPosts").doc(this.blogId);
      await dataBase.update({
        blogHTML: this.blogHTML,
        blogTitle: this.blogTitle,
        dateUpdate: timestamp,
      });
      this.isLoading = false;
      this.$router.push({
        name: "ViewBlog",
        params: { id: this.blogId },
      });
      this.$store.commit("CLEAR_STATE");
    },
    checkValidation(array) {
      return array.every((item) => item.length > 0);
    },
  },
  computed: {
    profileId() {
      return this.$store.state.currentUser.id;
    },
    blogCoverPhotoName() {
      return this.$store.state.blogPhotoName;
    },
    file() {
      return this.$store.state.file;
    },
    blogTitle: {
      get() {
        return this.$store.state.blogTitle;
      },
      set(payload) {
        this.$store.commit("UPDATE_BLOG_TITLE", payload);
      },
    },
    blogHTML: {
      get() {
        return this.$store.state.blogHTML;
      },
      set(payload) {
        this.$store.commit("NEW_BLOG_POST", payload);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.create-post {
  position: relative;
  height: 100%;
  button {
    margin-top: 0;
  }
  .router-button {
    text-decoration: none;
    color: #fff;
  }
  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out;
    align-self: center;
    font-size: 10px;
    cursor: pointer;
    padding: 6px 12px;
    color: #fff;
    background-color: #303030;
    border-radius: 32px;
    text-decoration: none;
    margin-bottom: 8px !important;
    text-align: center;
    @media (min-width: 500px) {
      margin-bottom: 0px;
      padding: 12px 24px;
      font-size: 14px;
    }
    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }
  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }
  .invisible {
    opacity: 0 !important;
  }
  .error-msg {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transform: 0.5s ease all;
    p {
      font-size: 14px;
    }
    span {
      font-weight: 600;
    }
  }
  .blog-info {
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;
    input:nth-child(1) {
      min-width: 200px;
    }
    input {
      flex: 1;
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;
      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }
    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;
      margin-top: 24px;
      @media (min-width: 800px) {
        margin-top: 0;
        flex-direction: row;
      }
      input {
        display: none;
      }
      .preview {
        margin-left: 16px;
        text-transform: initial;
        @media (max-width: 500px) {
          margin-left: 8px;
        }
      }
      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
        @media (max-width: 500px) {
          margin-left: 6px;
        }
      }
    }
    @media (min-width: 800px) {
      flex-direction: row;
    }
  }
  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
      /deep/ button {
        margin-top: 0px !important;
      }
    }
    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    /deep/ .ql-editor {
      padding: 20px 16px 30px;
      max-height: 50vh;
    }
  }
  .blog-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
    @media (max-width: 360px) {
      margin-top: 150px;
    }
  }
}
</style>
