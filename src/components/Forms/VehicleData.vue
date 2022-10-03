<template>
  <div>
      <el-form
        :model="vehicleForm1"
        :rules="rules"
        label-position="top" 
        ref="vehicleForm1"
        label-width="120px"
        :inline="true"
        class="demo-vehicleForm"
      >
        <el-form-item label="Moeda" prop="currency">
          <el-input placeholder="Insira" v-model="vehicleForm1.currency"></el-input>
        </el-form-item>
        <el-form-item label="Taxa Fiscal" prop="currencyTax">
          <el-input placeholder="Insira" v-model="vehicleForm1.currencyTax"></el-input>
        </el-form-item>
      </el-form>
      <el-form
        :model="vehicleForm2"
        :rules="rules"
        label-position="top" 
        ref="vehicleForm2"
        label-width="120px"
        :inline="true"
        class="demo-vehicleForm"
      >
        <el-form-item label="Importador" prop="importer">
          <el-input placeholder="Insira" v-model="vehicleForm2.importer"></el-input>
        </el-form-item>
        <el-form-item label="Faturamento" prop="billing">
          <el-input placeholder="Insira" v-model="vehicleForm2.billing"></el-input>
        </el-form-item>
        <el-form-item label="Data" prop="date">
          <el-date-picker
            v-model="vehicleForm2.date"
            type="date"
            placeholder="Selecione uma data">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="Modal" prop="modal">
          <el-input placeholder="Insira" v-model="vehicleForm2.modal"></el-input>
        </el-form-item>
        <el-form-item label="Tipo de Carga" prop="cargoType">
          <el-input placeholder="Insira" v-model="vehicleForm2.cargoType"></el-input>
        </el-form-item>
        <el-form-item label="Adquirente" prop="purchaser">
          <el-input placeholder="Insira" v-model="vehicleForm2.purchaser"></el-input>
        </el-form-item>
        <el-form-item label="FOB" prop="fob">
          <el-input placeholder="Insira" v-model="vehicleForm2.fob"></el-input>
        </el-form-item>
        <el-form-item label="Frete" prop="shipping">
          <el-input placeholder="Insira" v-model="vehicleForm2.shipping"></el-input>
        </el-form-item>
        <el-form-item label="Produto" prop="product">
          <el-input placeholder="Insira" v-model="vehicleForm2.product"></el-input>
        </el-form-item>
        <el-form-item label="Qtde. CNTR" prop="cntr">
          <el-input placeholder="Insira" v-model="vehicleForm2.cntr"></el-input>
        </el-form-item>
        <el-form-item label="Origem" prop="origin">
          <el-input placeholder="Insira" v-model="vehicleForm2.origin"></el-input>
        </el-form-item>
        <el-form-item label="Destino" prop="destination">
          <el-input placeholder="Insira" v-model="vehicleForm2.destination"></el-input>
        </el-form-item>
        <el-form-item label="ICMS Destino" prop="icmsDestination">
          <el-input placeholder="Insira" v-model="vehicleForm2.icmsDestination"></el-input>
        </el-form-item>
        <el-form-item label="NCM" prop="ncm">
          <el-input placeholder="Insira" v-model="vehicleForm2.ncm"></el-input>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>

export default {
  name: "VehicleData",
  data() {
    return {
      vehicleForm1: {
        currency: '',
        currencyTax: ''
      },
      vehicleForm2: {
        importer: '',
        billing: '',
        date: '',
        modal: '',
        cargoType: '',
        purchaser: '',
        fob: '',
        shipping: '',
        product: '',
        cntr: '',
        origin: '',
        destination: '',
        icmsDestination: '',
        ncm: ''
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
