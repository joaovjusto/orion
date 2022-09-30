<template>
  <nav>
    <div class="d-flex container">
      <img class="logo" src="../assets/orion-white.png" alt="">
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  nav {
    padding: 25px 0;
    background-color: #1A1A1A;
    // background-image: linear-gradient(to right, #a0a0a0, #8e8e8e, #7c7c7c, #6a6a6a, #595959);
    .logo {
      max-height: 50px;
    }
  }
</style>
