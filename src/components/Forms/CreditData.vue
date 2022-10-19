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
        <el-input @input="inputChanged($event)" placeholder="Insira" readonly v-model="creditForm.ipi"></el-input>
      </el-form-item>
      <el-form-item label="ICMS" prop="icms">
        <el-input @input="inputChanged($event)" placeholder="Insira" readonly v-model="creditForm.icms"></el-input>
      </el-form-item>
      <el-form-item label="PIS - Empresas do lucro real" prop="pis">
        <el-input @input="inputChanged($event)" placeholder="Insira" readonly v-model="creditForm.pis"></el-input>
      </el-form-item>
      <el-form-item label="COFINS - Empresas do lucro real" prop="cofins">
        <el-input @input="inputChanged($event)" placeholder="Insira" readonly v-model="creditForm.cofins"></el-input>
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
            <el-input @input="inputChanged($event)" readonly v-model="totalLiquidCostData"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import commonFormMixin from "@/utils/mixins/commonFormMixin";

export default {
  name: "CreditData",
  mixins: [commonFormMixin],
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
  mounted() {
    if (this.getCreditDataFromCache) {
      this.creditForm = this.getCreditDataFromCache;
    }
  },
  computed: {
    ...mapGetters(["getCreditDataFromCache"]),
  },
  methods: {
    ...mapActions(["updateFormTreeData"]),
    inputChanged() {
      const dataToUpdate = { ...this.creditForm };
      this.updateFormTreeData({data: dataToUpdate, stepName: 'creditData'});
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
