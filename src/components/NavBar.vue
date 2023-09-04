<template>
  <nav>
    <div id="navbar" class="d-flex container">
      <div style="display: flex;">
        <img class="logo" src="../assets/orion-white.png" alt="">
        <el-menu class="menu" :default-active="activeIndex" mode="horizontal" background-color="#1A1A1A" text-color="#fff"
          active-text-color="#ff5f18">
          <!-- @select="handleSelect" -->
          <el-menu-item index="1" @click="$router.push('/home')">Início</el-menu-item>
          <el-menu-item index="2" @click="$router.push('/propostas')">Propostas</el-menu-item>
        </el-menu>
      </div>
      <el-button type="text" @click="logOut">SAIR</el-button>
    </div>
  </nav>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { mapActions } from "vuex";

export default {
  name: 'NavBar',
  data() {
    return {
      activeIndex: "1",
    };
  },
  watch:{
    $route (){
      const currentRoute = this.$router.currentRoute
      console.log('currentRoute', currentRoute)
      switch (currentRoute.name) {
        case 'home':
          this.activeIndex = "1"
          break
        case 'propostas':
          this.activeIndex = "2"
          break
        default:
          this.activeIndex = "1"
      }
    }
  },
  methods: {
    ...mapActions(["setUser"]),
    logOut() {
      firebase.auth().signOut().then(() => {
        firebase.auth().onAuthStateChanged(() => {
          this.$router.push('/login')
          this.setUser({});
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
nav {
  padding: 25px 0;
  background-color: #1A1A1A;

  // background-image: linear-gradient(to right, #a0a0a0, #8e8e8e, #7c7c7c, #6a6a6a, #595959);
  div#navbar {
    justify-content: space-between;
  }

  .logo {
    max-height: 50px;
  }

  .menu {
    margin-left: 16px;
  }
}

.el-button--text {
  color: white !important;
}

.el-menu.el-menu--horizontal {
  border: none;
}
</style>
