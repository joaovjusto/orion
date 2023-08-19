<template>
    <div id="app" v-loading="getLoadingState" element-loading-text="Trabalhando nisso..">
        <NavBar />
        <div class="body">
            <div class="container pt-5">
                <StepDescription :activeStep="activeIndex" :steps="steps" @changeStep="changeStep" />
                <FormContainer class="py-5" :steps="steps" :title="activeForm.title" :activeStep="activeIndex"
                    @changeStep="changeStep">
                    <component :is="activeForm.name" />
                </FormContainer>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import NavBar from "./NavBar.vue";
import StepDescription from "./StepDescription.vue";
import FormContainer from "./FormContainer.vue";

import VehicleData from "./Forms/VehicleData.vue";
import CostData from "./Forms/CostData.vue";
import TributeData from "./Forms/TributeData.vue";
import ImportData from "./Forms/ImportData.vue";
import FinalStep from "./Forms/FinalStep.vue";
import ResumeData from "./Forms/ResumeData.vue";

import Cookies from "js-cookie";

import { mapActions, mapGetters } from "vuex";

const steps = [
    { name: "VehicleData", title: "Veículo" },
    { name: "CostData", title: "Despesas" },
    { name: "TributeData", title: "Tributos" },
    { name: "ImportData", title: "Aduaneira" },
    // { name: "FinalStep", title: "Finalização" },
    { name: "ResumeData", title: "Proposta" },
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
        FinalStep,
        ResumeData,
    },
    data() {
        return {
            steps,
            activeForm: steps[0],
            activeIndex: 0,
        };
    },
    watch: {
        activeIndex() {
            this.updateAllSteps();
        },
    },
    computed: {
        ...mapGetters([
            "getLoadingState",
            "getVehicleDataFromCache",
            "getCostDataFromCache",
            "getTributeDataFromCache",
            "getImportDataFromCache",
            // "getFinalStepFromCache",
            "getResumeDataFromCache",
        ]),
    },
    mounted() {
        this.setLoadingState(true)

        axios
            .get("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL")
            .then((result) => {
                this.setLoadingState(false)
                const { EURBRL, USDBRL } = result.data;

                // Check if was selected a currency before
                if (Object.keys(this.getVehicleDataFromCache).length > 0) {
                    if (Object.keys(this.getVehicleDataFromCache).includes("currency")) {
                        // Updating to all application the money config
                        const moneyConfigOptions = {
                            EUR: {
                                decimal: ",",
                                thousands: ".",
                                prefix: "€ ",
                                precision: 2,
                                masked: false /* doesn't work with directive */,
                            },
                            USD: {
                                decimal: ",",
                                thousands: ".",
                                prefix: "$ ",
                                precision: 2,
                                masked: false /* doesn't work with directive */,
                            },
                        };
                        this.updateCurrencyData({
                            ...{ EURBRL, USDBRL },
                            moneyConfig:
                                moneyConfigOptions[this.getVehicleDataFromCache.currency],
                        });
                    } else {
                        this.updateCurrencyData({ EURBRL, USDBRL });
                    }
                }

                this.$notify({
                    title: "Sucesso",
                    message: "Cotação atualizada - Euro, Dólar",
                    type: "success",
                });
            })
            .catch((err) => {
                console.log(err);
                this.$notify({
                    title: "Atenção",
                    message: "Dados da cotação atual não podem ser atualizados",
                    type: "warning",
                });
            });

        // Updating vuex with values
        const cachesCreated = Cookies.get();
        const steps = {
            vehicleData: this.getVehicleDataFromCache,
            costData: this.getCostDataFromCache,
            tributeData: this.getTributeDataFromCache,
            importData: this.getImportDataFromCache,
            // finalStep: this.getFinalStepFromCache,
            resumeData: this.getResumeDataFromCache,
            default: (stepData) => stepData,
        };

        // Updating only cached states
        Object.keys(cachesCreated).forEach((cacheName) => {
            if (Object.keys(steps).includes(cacheName)) {
                this.updateFormTreeData({
                    data: steps[cacheName],
                    stepName: cacheName,
                });
            }
        });

        this.updateAllSteps();
    },
    methods: {
        ...mapActions([
            "updateFormTreeData",
            "updateCurrencyData",
            "updateAllSteps",
            "setLoadingState"
        ]),
        changeStep(stepIndex) {
            this.activeIndex = stepIndex - 1;
            this.activeForm = steps[stepIndex - 1];
            Cookies.set("lastActiveStep", stepIndex);
        },
    },
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
