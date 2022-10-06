<template>
  <div>
    <el-form>
      <el-form-item prop="currency">
        <el-dropdown>
          <el-button type="primary">
            Tipo de Veículo<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(option, i) in vehicleData" :key="i">{{
              option
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
    </el-form>
    <el-form
      :model="tributeForm"
      label-position="top"
      ref="tributeForm"
      :inline="true"
      class="demo-vehicleForm"
    >
      <el-form-item label="II" prop="ii">
        <el-input @input="inputChanged($event)" placeholder="Insira" v-model="tributeForm.ii"></el-input>
      </el-form-item>
      <el-form-item label="Valor II" prop="valueIi">
        <el-input @input="inputChanged($event)" placeholder="Insira" v-model="tributeForm.valueIi"></el-input>
      </el-form-item>
    </el-form>
    <el-form label-position="top" :inline="true">
      <el-form-item label="IPI" prop="ipi">
        <el-input @input="inputChanged($event)" placeholder="Insira" v-model="tributeForm.ipi"></el-input>
      </el-form-item>
      <el-form-item label="Valor IPI" prop="valueIpi">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="tributeForm.valueIpi"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-form label-position="top" :inline="true">
      <el-form-item label="COFINS" prop="cofins">
        <el-input @input="inputChanged($event)" placeholder="Insira" v-model="tributeForm.cofins"></el-input>
      </el-form-item>
      <el-form-item label="Valor COFINS" prop="valueCofins">
        <el-input
        @input="inputChanged($event)"
          placeholder="Insira"
          v-model="tributeForm.valueCofins"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-form label-position="top" :inline="true">
      <el-form-item label="TUS" prop="tus">
        <el-input @input="inputChanged($event)" placeholder="Insira" v-model="tributeForm.tus"></el-input>
      </el-form-item>
      <el-form-item label="Valor TUS" prop="valueTus">
        <el-input
        @input="inputChanged($event)"
          placeholder="Insira"
          v-model="tributeForm.valueTus"
        ></el-input>
      </el-form-item>
    </el-form>

    <el-divider />

    <div class="row">
      <div class="col-12 text-right">
        <el-form
          label-position="top"
          label-width="120px"
          :inline="true"
          class="demo-vehicleForm"
        >
          <el-form-item label="TOTAL" class="text-left" prop="thc">
            <el-input @input="inputChanged($event)" readonly v-model="total"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

const vehicleData = [
  "A partir de 2000cc",
  "Até 1999cc",
  "Até 1500cc",
  "Elétrico",
  "Híbrido",
  "Pick-up Gasolina",
  "Diesel Leve",
  "Diesel Pesado",
];

export default {
  name: "TributeData",
  data() {
    return {
      total: "",
      vehicleData,
      tributeForm: {
        ii: "",
        valueIi: "",
        ipi: "",
        valueIpi: "",
        cofins: "",
        valueCofins: "",
        tus: "",
        valueTus: "",
      },
    };
  },
  mounted() {
    if (this.getTributeDataFromCache) {
      this.tributeForm = this.getTributeDataFromCache;
    }
  },
  computed: {
    ...mapGetters(["getTributeDataFromCache"]),
  },
  methods: {
    ...mapActions(["updateFormTreeData"]),
    inputChanged() {
      const dataToUpdate = { ...this.tributeForm };
      this.updateFormTreeData({data: dataToUpdate, stepName: 'tributeData'});
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
