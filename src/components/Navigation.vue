<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }">
          FireBlogs
        </router-link>
      </div>
      <div class="nav-links">
        <ul v-if="!mobile">
          <router-link class="link" to="/">Home</router-link>
          <router-link class="link" to="/blogs">Blogs</router-link>
          <router-link v-if="admin" class="link" to="/create-post"
            >Create Post</router-link
          >
          <router-link v-if="!isLoggedIn" class="link" to="/login"
            >Login/Register</router-link
          >
        </ul>
        <div
          v-if="isLoggedIn"
          @click="profileMenu = !profileMenu"
          class="profile"
          ref="profile"
        >
          <span>{{ $store.state.profileInitials }}</span>
          <div class="profile-menu" v-if="profileMenu">
            <div class="info">
              <p class="initials">{{ $store.state.profileInitials }}</p>
              <div class="right">
                <p>
                  {{ $store.state.currentUser.firstName }}
                  {{ $store.state.currentUser.lastName }}
                </p>
                <p>{{ $store.state.currentUser.username }}</p>
                <p>{{ $store.state.currentUser.email }}</p>
              </div>
            </div>
            <div class="options">
              <div class="option">
                <router-link to="/profile" class="option">
                  <UserIcon class="icon" />
                  <p>Profile</p>
                </router-link>
              </div>
              <div v-if="admin" class="option">
                <router-link to="/admin" class="option">
                  <AdminIcon class="icon" />
                  <p>Admin</p>
                </router-link>
              </div>
              <div class="option" @click="signOut">
                <SignOutIcon class="icon" />
                <p>Sign out</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <menuIcon class="menu-icon" @click="toggleMobileNav" v-if="mobile" />
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-if="mobileNav">
        <router-link class="link" to="/">Home</router-link>
        <router-link class="link" to="/blogs">Blogs</router-link>
        <router-link v-if="admin" class="link" to="/create-post"
          >Create Post</router-link
        >
        <router-link v-if="!isLoggedIn" class="link" to="/login"
          >Login/Register</router-link
        >
        <div @click="$store.commit('TOGGLE_MOBILE_NAV')"></div>
      </ul>
    </transition>
  </header>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

import menuIcon from "../assets/Icons/bars-regular.svg";
import UserIcon from "../assets/Icons/user-alt-light.svg";
import AdminIcon from "../assets/Icons/user-crown-light.svg";
import SignOutIcon from "../assets/Icons/sign-out-alt-regular.svg";
export default {
  name: "navigation",
  components: {
    menuIcon,
    UserIcon,
    AdminIcon,
    SignOutIcon,
  },
  data() {
    return {
      mobile: null,
      windowWidth: null,
      profileMenu: null,
    };
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  methods: {
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
    },
    signOut() {
      firebase.auth().signOut();
      location.reload();
    },
    toggleMobileNav() {
      this.$store.commit("TOGGLE_MOBILE_NAV");
    },
  },
  computed: {
    mobileNav() {
      return this.$store.state.mobileNav;
    },
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    admin() {
      return this.$store.state.profileAdmin;
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;
  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;
    &:hover {
      color: #1eb8b8;
    }
  }
  nav {
    display: flex;
    padding: 25px 0;
    .branding {
      display: flex;
      align-items: center;
      .header {
        font-weight: 600;
        font-size: 24px;
        color: #000;
        text-decoration: none;
      }
    }
    .nav-links {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex: 1;
      ul {
        margin-right: 32px;
        .link {
          margin-right: 32px;
        }
        .link:last-child {
          margin-right: 0;
        }
      }
      .profile {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: #fff;
        background-color: #303030;
        .profile-menu {
          position: absolute;
          top: 60px;
          right: 0;
          width: 250px;
          background-color: #303030;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
          .info {
            display: flex;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #fff;
            .initials {
              position: initial;
              width: 40px;
              height: 40px;
              background-color: #fff;
              color: #303030;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
            }
            .right {
              flex: 1;
              margin-left: 24px;
              p:nth-child(1) {
                font-size: 14px;
              }
              p:nth-child(2),
              p:nth-child(3) {
                font-size: 12px;
              }
            }
          }
          .options {
            padding: 15px;
            .option {
              text-decoration: none;
              color: #fff;
              display: flex;
              align-items: center;
              margin-bottom: 12px;
              .icon {
                width: 18px;
                height: auto;
              }
              p {
                font-size: 14px;
                margin-left: 12px;
              }
              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
        @media (max-width: 750px) {
          position: relative;

          right: 40px;
        }
      }
    }
  }
  .menu-icon {
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 25px;
    height: 25px;
    width: auto;
  }
  .mobile-nav {
    padding: 20px;
    width: 70%;
    max-width: 250px;
    min-width: 200px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;
    .link {
      color: #fff;
      padding: 15px;
    }
    div {
      position: fixed;
      width: calc(100vw - 250px);
      min-width: calc(100% - 200px);
      height: 100%;
      right: 0;
      top: 0;
      @media (min-width: 750px) {
      }
    }
  }
  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: all 1s ease;
  }
  .mobile-nav-enter {
    transform: translateX(-250px);
  }
  .mobile-nav-enter-to {
    transform: translateX(0px);
  }
  .mobile-nav-leave-to {
    transform: translateX(-250px);
  }
}
</style>
