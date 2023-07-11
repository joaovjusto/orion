<template>
  <div id="app">
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: "App",
};
</script>

<style lang="scss">
@import url(//db.onlinewebfonts.com/c/066ce24dae3730ed6c648b09efaea93a?family=Acumin+Variable+Concept);

@font-face {
  font-family: "Acumin Variable Concept";
  src: url("//db.onlinewebfonts.com/t/066ce24dae3730ed6c648b09efaea93a.eot");
  src: url("//db.onlinewebfonts.com/t/066ce24dae3730ed6c648b09efaea93a.eot?#iefix") format("embedded-opentype"),
    url("//db.onlinewebfonts.com/t/066ce24dae3730ed6c648b09efaea93a.woff2") format("woff2"),
    url("//db.onlinewebfonts.com/t/066ce24dae3730ed6c648b09efaea93a.woff") format("woff"),
    url("//db.onlinewebfonts.com/t/066ce24dae3730ed6c648b09efaea93a.ttf") format("truetype"),
    url("//db.onlinewebfonts.com/t/066ce24dae3730ed6c648b09efaea93a.svg#Acumin Variable Concept") format("svg");
}

#app {
  font-family: "Roboto", sans-serif;
}

.pdf {
  font-family: "Acumin Variable Concept", sans-serif;
  letter-spacing: -1px;
  color: #7b7b7b;
}

#app {
  min-height: calc(100vh);
  // background-color: #1A1A1A;
  background-image: linear-gradient(to right,
      #a0a0a0,
      #8e8e8e,
      #7c7c7c,
      #6a6a6a,
      #595959);
}
</style>
