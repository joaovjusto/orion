<template>
  <div id="app">
    <NavBar/>
    <div class="body">
      <div class="container pt-5">
        <StepDescription/>
        <FormContainer class="py-5" title="Veículo">
          <component :is="activeForm"/>
        </FormContainer>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import StepDescription from './components/StepDescription.vue'
import VehicleData from './components/VehicleData.vue'
import FormContainer from "./components/FormContainer.vue";

export default {
  name: 'App',
  components: {
    NavBar,
    StepDescription,
    VehicleData,
    FormContainer
  },
  data() {
    return {
      activeForm: 'VehicleData'
    }
  },
}
</script>

<style lang="scss" scoped>
  * {
    font-family: 'Roboto', sans-serif;
  }
  #app {
    min-height: calc(100vh);
    // background-color: #1A1A1A;
    background-image: linear-gradient(to right, #a0a0a0, #8e8e8e, #7c7c7c, #6a6a6a, #595959);
    .body {
    }
  }
</style>
