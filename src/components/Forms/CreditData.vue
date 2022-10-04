<template>
  <div>
    <el-form
      :model="creditForm"
      label-position="top"
      ref="creditForm"
      label-width="120px"
      :inline="true"
      class="demo-creditForm"
    >
      <el-form-item label="IPI" prop="ipi">
        <el-input placeholder="Insira" readonly v-model="creditForm.ipi"></el-input>
      </el-form-item>
      <el-form-item label="ICMS" prop="icms">
        <el-input placeholder="Insira" readonly v-model="creditForm.icms"></el-input>
      </el-form-item>
      <el-form-item label="PIS - Empresas do lucro real" prop="pis">
        <el-input placeholder="Insira" readonly v-model="creditForm.pis"></el-input>
      </el-form-item>
      <el-form-item label="COFINS - Empresas do lucro real" prop="cofins">
        <el-input placeholder="Insira" readonly v-model="creditForm.cofins"></el-input>
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
          <el-form-item label="CUSTO LIQUIDO DE IMPORTAÇÃO" class="text-left" prop="thc">
            <el-input readonly v-model="totalLiquidCostData"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreditData",
  data() {
    return {
      totalLiquidCostData: "1000",
      creditForm: {
        ipi: "",
        icms: "",
        pis: "",
        cofins: "",
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
