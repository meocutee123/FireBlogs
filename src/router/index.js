import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import VueMeta from "vue-meta";
Vue.use(VueRouter);
Vue.use(VueMeta);
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/blogs",
    name: "Blogs",
    meta: {
      title: "Blogs",
    },
    component: () => import("../views/Blog.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "Login",
    },
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      title: "Register",
    },
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    meta: {
      title: "Forgot password",
    },
    component: () => import("../views/ForgotPassword.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    meta: {
      title: "Admin",
    },
    component: () => import("../views/Admin.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: {
      title: "Profile",
    },
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/create-post",
    name: "CreatePost",
    meta: {
      title: "Create Post",
    },
    component: () => import("../views/CreatePost.vue"),
  },
  {
    path: "/edit-post",
    name: "EditPost",
    meta: {
      title: "Edit Post",
    },
    component: () => import("../views/EditBlog.vue"),
  },
  {
    path: "/blog-preview",
    name: "BlogPreview",
    meta: {
      title: "Blog Preview",
    },
    component: () => import("../views/BlogPreview.vue"),
  },
  {
    path: "/view-blog/:id",
    name: "ViewBlog",
    meta: {
      title: "View Blog",
    },
    component: () => import("../views/ViewBlog.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(
  (to, _, next) => ((document.title = `${to.meta.title} | FireBlog`), next())
);
export default router;
