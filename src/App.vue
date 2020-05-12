<template>
  <div id="app">
    <Navbar v-if="navbar.show"></Navbar>
    <router-view />
  </div>
</template>

<script>

  import Navbar from "@/components/Navbar";

  export default {
    name: "App",
    provide() {
      return {

      };
    },
    data() {
      return {
        navbar: {
          show: true,
        },
        userinfo: {}
      };
    },
    components: {
      Navbar: Navbar
    },
    created() { },
    watch: {
      $route(to, from) {
        this.showNavbar();
      }
    },
    computed: {},
    mounted() {
      this.showNavbar();
    },
    methods: {
      showNavbar() {
        if (this.$route.path === "/login") {
          this.navbar.show = false;
        } else {
          this.navbar.show = true;
        }
      },
    }
  };
</script>

<style>
  @import "./css/app.css";

  html {
    background: url(./images/bg.png) no-repeat center;
  }
</style>