<template>
  <div>
    <el-form
      :model="importForm"
      label-position="top"
      ref="importForm"
      label-width="120px"
      :inline="true"
      class="demo-importForm"
    >
      <el-form-item label="Armazenagem (10 dias)" prop="storage">
        <el-input placeholder="Insira" readonly v-model="importForm.storage"></el-input>
      </el-form-item>
      <el-form-item label="AFRMM" prop="afrmm">
        <el-input placeholder="Insira" readonly v-model="importForm.afrmm"></el-input>
      </el-form-item>
      <el-form-item label="DTC" prop="dtc">
        <el-input placeholder="Insira" v-model="importForm.dtc"></el-input>
      </el-form-item>
      <el-form-item label="DESOVA E DEVOLUÇÃO CTR" prop="ctr">
        <el-input placeholder="Insira" v-model="importForm.ctr"></el-input>
      </el-form-item>
      <el-form-item label="Documentos" prop="docs">
        <el-input placeholder="Insira" v-model="importForm.docs"></el-input>
      </el-form-item>
      <el-form-item label="S.D.A" prop="sda">
        <el-input placeholder="Insira" v-model="importForm.sda"></el-input>
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
          <el-form-item label="TOTAL DESPESAS ADUANEIRAS" class="text-left" prop="thc">
            <el-input readonly v-model="total"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <el-divider />

    <div class="row">
      <div class="col-12 text-right">
        <el-form
          label-position="top"
          label-width="120px"
          :inline="true"
          class="demo-vehicleForm"
        >
          <el-form-item label="TOTAL DESEMBOLSO" class="text-left" prop="thc">
            <el-input readonly v-model="totalCostData"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImportData",
  data() {
    return {
      totalCostData: "",
      total: "",
      importForm: {
        storage: "300",
        afrmm: "500",
        dtc: "",
        ctr: "",
        docs: "",
        sda: "",
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
