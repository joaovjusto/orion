<template>
  <nav>
    <div class="d-flex container">
      <img class="logo" src="../assets/orion-white.png" alt="">
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
    div {
      justify-content: space-between;
    }
    .logo {
      max-height: 50px;
    }
  }
  .el-button--text {
    color: white !important;
  }
</style>
