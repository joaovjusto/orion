<template>
  <div>
    <el-form
      :model="costForm"
      label-position="top"
      ref="costForm"
      label-width="120px"
      :inline="true"
      class="demo-vehicleForm"
    >
      <el-form-item label="FOB" prop="fob">
        <el-input readonly placeholder="Insira" v-model="costForm.fob"></el-input>
      </el-form-item>
      <el-form-item label="Frete" prop="shipping">
        <el-input placeholder="Insira" v-model="costForm.shipping"></el-input>
      </el-form-item>
      <el-form-item label="Seguro" prop="insurance">
        <el-input placeholder="Insira" v-model="costForm.insurance"></el-input>
      </el-form-item>
      <el-form-item label="THC (Capatazia)" prop="thc">
        <el-input placeholder="Insira" v-model="costForm.thc"></el-input>
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
          <el-input readonly v-model="total"></el-input>
        </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CostData",
  data() {
    return {
      costForm: {},
      total: "",
    };
  },
};
</script>
