import Vue from "vue";
import Vuex from "vuex";

import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    file: null,
    blogId: null,
    blogHTML: "Write your blog title here...",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    blogPosts: [],
    sampleBlogCards: [
      {
        blogTitle: "Blog Card #1",
        blogCoverPhoto: "stock-1",
        blogDate: "May 1, 2021",
      },
      {
        blogTitle: "Blog Card #1",
        blogCoverPhoto: "stock-2",
        blogDate: "May 1, 2021",
      },
      {
        blogTitle: "Blog Card #1",
        blogCoverPhoto: "stock-3",
        blogDate: "May 1, 2021",
      },
      {
        blogTitle: "Blog Card #1",
        blogCoverPhoto: "stock-4",
        blogDate: "May 1, 2021",
      },
    ],
    editPost: null,
    currentUser: null,
    profileInitials: null,
    profileAdmin: null,
    isLoggedIn: null,
    mobileNav: null,
  },
  getters: {
    blogPostFeed(state) {
      return state.blogPosts.slice(0, 2);
    },
    blogPostCards(state) {
      return state.blogPosts.slice(2, 6);
    },
    getCurrentPost(state) {
      return (id) => state.blogPosts.find((post) => post.blogId === id);
    },
  },
  mutations: {
    CLEAR_STATE(state) {
      state.file = null;
      state.blogId = null;
      state.blogHTML = "Write your blog title here...";
      state.blogTitle = "";
      state.blogPhotoName = "";
      state.blogPhotoFileURL = null;
      state.blogPhotoPreview = null;
    },
    SET_STATE(state, payload) {
      const post = state.blogPosts.find((post) => post.blogId === payload);
      if (post) {
        state.blogId = payload;
        state.blogHTML = post.blogHTML;
        state.blogTitle = post.blogTitle;
        state.blogPhotoName = post.blogCoverPhotoName;
        state.blogPhotoFileURL = post.blogCoverPhoto;
      }
    },
    NEW_BLOG_POST(state, payload) {
      state.blogHTML = payload;
    },
    FILE_NAME_CHANGE(state, payload) {
      state.blogPhotoName = payload;
    },
    CREATE_FILE_URL(state, payload) {
      state.blogPhotoFileURL = payload;
    },
    SET_FILE(state, payload) {
      state.file = payload;
    },
    OPEN_PHOTO_PREVIEW(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },
    UPDATE_BLOG_TITLE(state, payload) {
      state.blogTitle = payload;
    },
    TOGGLE_EDIT_POST(state, payload) {
      state.editPost = payload;
    },
    TOGGLE_MOBILE_NAV(state) {
      state.mobileNav = !state.mobileNav;
    },
    SET_CURRENT_USER(state, payload) {
      state.currentUser = { ...payload.data(), id: payload.id };
    },
    SET_PROFILE_INITIALS(state) {
      const userProfile = state.currentUser;
      state.profileInitials =
        userProfile.firstName.match(/(\b\S)?/g).join("") +
        userProfile.lastName.match(/(\b\S)?/g).join("");
    },
    SET_PROFILE_ADMIN(state, payload = null) {
      state.profileAdmin = payload;
    },
    UPDATE_LOGGED_IN_STATE(state, payload) {
      state.isLoggedIn = payload;
    },
    SET_POST(state, payload) {
      state.blogPosts = payload;
    },
  },
  actions: {
    async getCurrentUser({ commit }) {
      const database = db
        .collection("users")
        .doc(firebase.auth().currentUser.uid);
      const result = await database.get();
      commit("SET_CURRENT_USER", result);
      commit("SET_PROFILE_ADMIN", result.data().isAdmin);
      commit("SET_PROFILE_INITIALS");
    },
    async updateUserSettings({ commit, state }) {
      const database = db.collection("users").doc(state.currentUser.id);
      await database.update(state.currentUser);
      commit("SET_PROFILE_INITIALS");
    },
    getPost({ commit }) {
      const database = db.collection("blogPosts").orderBy("date", "desc");
      database.onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => data.push(doc.data()));
        if (data.length) commit("SET_POST", data);
      });
    },
    async deletePost(_, id) {
      const postRef = db.collection("blogPosts").doc(id);
      await postRef.delete();
    },
  },
  modules: {},
});
