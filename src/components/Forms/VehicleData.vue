<template>
  <div>
    <el-form
      :model="vehicleForm"
      :rules="rules"
      label-position="top"
      ref="vehicleForm"
      label-width="120px"
      :inline="true"
      class="demo-vehicleForm"
    >
      <el-form-item label="Moeda" prop="currency">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="vehicleForm.currency"
        ></el-input>
      </el-form-item>
      <el-form-item label="Taxa Fiscal" prop="currencyTax">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="vehicleForm.currencyTax"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-form
      :model="vehicleForm"
      :rules="rules"
      label-position="top"
      ref="vehicleForm"
      label-width="120px"
      :inline="true"
      class="demo-vehicleForm"
    >
      <el-form-item label="Importador" prop="importer">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="vehicleForm.importer"
        ></el-input>
      </el-form-item>
      <el-form-item label="Faturamento" prop="billing">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="vehicleForm.billing"
        ></el-input>
      </el-form-item>
      <el-form-item label="Data" prop="date">
        <el-date-picker
          v-model="vehicleForm.date"
          type="date"
          @input="inputChanged($event)"
          placeholder="Selecione uma data"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Modal" prop="modal">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="vehicleForm.modal"
        ></el-input>
      </el-form-item>
      <el-form-item label="Tipo de Carga" prop="cargoType">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="vehicleForm.cargoType"
        ></el-input>
      </el-form-item>
      <el-form-item label="Adquirente" prop="purchaser">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="vehicleForm.purchaser"
        ></el-input>
      </el-form-item>
      <el-form-item label="FOB" prop="fob">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="vehicleForm.fob"
        ></el-input>
      </el-form-item>
      <el-form-item label="Frete" prop="shipping">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="vehicleForm.shipping"
        ></el-input>
      </el-form-item>
      <el-form-item label="Produto" prop="product">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="vehicleForm.product"
        ></el-input>
      </el-form-item>
      <el-form-item label="Qtde. CNTR" prop="cntr">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="vehicleForm.cntr"
        ></el-input>
      </el-form-item>
      <el-form-item label="Origem" prop="origin">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="vehicleForm.origin"
        ></el-input>
      </el-form-item>
      <el-form-item label="Destino" prop="destination">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="vehicleForm.destination"
        ></el-input>
      </el-form-item>
      <el-form-item label="ICMS Destino" prop="icmsDestination">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="vehicleForm.icmsDestination"
        ></el-input>
      </el-form-item>
      <el-form-item label="NCM" prop="ncm">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="vehicleForm.ncm"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "VehicleData",
  data() {
    return {
      vehicleForm: {
        currency: "",
        currencyTax: "",
        importer: "",
        billing: "",
        date: "",
        modal: "",
        cargoType: "",
        purchaser: "",
        fob: "",
        shipping: "",
        product: "",
        cntr: "",
        origin: "",
        destination: "",
        icmsDestination: "",
        ncm: "",
      },
      rules: {
        // name: [
        //   {
        //     required: true,
        //     message: "Please input Activity name",
        //     trigger: "blur",
        //   },
        //   {
        //     min: 3,
        //     max: 5,
        //     message: "Length should be 3 to 5",
        //     trigger: "blur",
        //   },
        // ],
        // region: [
        //   {
        //     required: true,
        //     message: "Please select Activity zone",
        //     trigger: "change",
        //   },
        // ],
        // date1: [
        //   {
        //     type: "date",
        //     required: true,
        //     message: "Please pick a date",
        //     trigger: "change",
        //   },
        // ],
        // date2: [
        //   {
        //     type: "date",
        //     required: true,
        //     message: "Please pick a time",
        //     trigger: "change",
        //   },
        // ],
        // type: [
        //   {
        //     type: "array",
        //     required: true,
        //     message: "Please select at least one activity type",
        //     trigger: "change",
        //   },
        // ],
        // resource: [
        //   {
        //     required: true,
        //     message: "Please select activity resource",
        //     trigger: "change",
        //   },
        // ],
        // desc: [
        //   {
        //     required: true,
        //     message: "Please input activity form",
        //     trigger: "blur",
        //   },
        // ],
      },
    };
  },
  mounted() {
    if (this.getVehicleDataFromCache) {
      this.vehicleForm = this.getVehicleDataFromCache;
    }
  },
  computed: {
    ...mapGetters(["getVehicleDataFromCache"]),
  },
  methods: {
    ...mapActions(["updateVehicleData"]),
    inputChanged() {
      const dataToUpdate = { ...this.vehicleForm };
      this.updateVehicleData(dataToUpdate);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
