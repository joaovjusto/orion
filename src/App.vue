<template>
  <div id="app">
    <NavBar />
    <div class="body">
      <div class="container pt-5">
        <StepDescription :steps="steps" @changeStep="changeStep" />
        <FormContainer class="py-5" :title="activeForm.title">
          <component :is="activeForm.name" />
        </FormContainer>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import StepDescription from "./components/StepDescription.vue";
import FormContainer from "./components/FormContainer.vue";

import VehicleData from "./components/Forms/VehicleData.vue";
import CostData from "./components/Forms/CostData.vue";
import TributeData from "./components/Forms/TributeData.vue";
import ImportData from "./components/Forms/ImportData.vue";
import CreditData from "./components/Forms/CreditData.vue";
import FinalStep from "./components/Forms/FinalStep.vue";
import ResumeData from "./components/Forms/ResumeData.vue";

import Cookies from "js-cookie";

import { mapActions, mapGetters } from "vuex";

const steps = [
  { name: "VehicleData", title: "Veículo" },
  { name: "CostData", title: "Despesas" },
  { name: "TributeData", title: "Tributos" },
  { name: "ImportData", title: "Aduaneira" },
  { name: "CreditData", title: "Créditos" },
  { name: "FinalStep", title: "Finalização" },
  { name: "ResumeData", title: "Revisão" },
];

export default {
  name: "App",
  components: {
    NavBar,
    StepDescription,
    FormContainer,
    VehicleData,
    CostData,
    TributeData,
    ImportData,
    CreditData,
    FinalStep,
    ResumeData,
  },
  data() {
    return {
      steps,
      activeForm: steps[0],
    };
  },
  computed: {
    ...mapGetters([
      "getVehicleDataFromCache",
      "getCostDataFromCache",
      "getTributeDataFromCache",
      "getCreditDataFromCache",
      "getImportDataFromCache",
      "getFinalStepFromCache",
    ]),
  },
  mounted() {
    // Updating vuex with values
    const cachesCreated = Cookies.get();
    const steps = {
      vehicleData: this.getVehicleDataFromCache,
      costData: this.getCostDataFromCache,
      tributeData: this.getTributeDataFromCache,
      creditData: this.getCreditDataFromCache,
      importData: this.getImportDataFromCache,
      finalStep: this.getFinalStepFromCache,
      default: (stepData) => {
        return stepData;
      },
    };

    Object.keys(cachesCreated).forEach((cacheName) => {
      if (Object.keys(steps).includes(cacheName)) {
        this.updateFormTreeData({
          data: steps[cacheName],
          stepName: cacheName,
        });
      }
    });
  },
  methods: {
    ...mapActions(["updateFormTreeData"]),
    changeStep(stepIndex) {
      this.activeForm = steps[stepIndex - 1];
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  font-family: "Roboto", sans-serif;
}
#app {
  min-height: calc(100vh);
  // background-color: #1A1A1A;
  background-image: linear-gradient(
    to right,
    #a0a0a0,
    #8e8e8e,
    #7c7c7c,
    #6a6a6a,
    #595959
  );
  .body {
  }
}
</style>
