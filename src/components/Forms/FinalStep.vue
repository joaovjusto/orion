<template>
  <div>
    <el-form
      label-position="top"
      label-width="120px"
      :inline="true"
      class="demo-finalStepForm"
    >
      <el-form-item
        label="CUSTO LIQUIDO DE IMPORTAÇÃO"
        class="text-left"
        prop="thc"
      >
        <el-input
          @input="inputChanged($event)"
          readonly
          v-model="totalLiquidCostData"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <el-form
      :model="finalStepForm"
      label-position="top"
      ref="finalStepForm"
      label-width="120px"
      :inline="true"
      class="demo-finalStepForm"
    >
      <el-form-item label="Base de calculo faturamento" prop="invoiceValue">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          readonly
          v-model="finalStepForm.invoiceValue"
        ></el-input>
      </el-form-item>
    </el-form>

    <el-form label-position="top" :inline="true">
      <el-form-item label="ICMS" prop="icms">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="finalStepForm.icms"
        ></el-input>
      </el-form-item>
      <el-form-item label="Valor" prop="valueIcms">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="finalStepForm.valueIcms"
        ></el-input>
      </el-form-item>
    </el-form>

    <el-form label-position="top" :inline="true">
      <el-form-item label="PIS" prop="pis">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="finalStepForm.pis"
        ></el-input>
      </el-form-item>
      <el-form-item label="Valor" prop="valuePis">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="finalStepForm.valuePis"
        ></el-input>
      </el-form-item>
    </el-form>

    <el-form label-position="top" :inline="true">
      <el-form-item label="COFINS" prop="cofins">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="finalStepForm.cofins"
        ></el-input>
      </el-form-item>
      <el-form-item label="Valor" prop="valueCofins">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="finalStepForm.valueCofins"
        ></el-input>
      </el-form-item>
    </el-form>

    <el-form label-position="top" :inline="true">
      <el-form-item label="Margem" prop="margin">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="finalStepForm.margin"
        ></el-input>
      </el-form-item>
      <el-form-item label="Valor" prop="valueMargin">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="finalStepForm.valueMargin"
        ></el-input>
      </el-form-item>
    </el-form>

    <el-form label-position="top" :inline="true">
      <el-form-item label="Mark Up Divisor" prop="markUpDivisor">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="finalStepForm.markUpDivisor"
        ></el-input>
      </el-form-item>
      <el-form-item label="Valor" prop="valueMarkUpDivisor">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="finalStepForm.valueMarkUpDivisor"
        ></el-input>
      </el-form-item>
    </el-form>

    <el-form label-position="top" :inline="true">
      <el-form-item label="IPI" prop="ipi">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="finalStepForm.ipi"
        ></el-input>
      </el-form-item>
      <el-form-item label="Valor" prop="valueIpi">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="finalStepForm.valueIpi"
        ></el-input>
      </el-form-item>
    </el-form>

    <el-divider />

    <strong>TOTAL ENCARGOS</strong>

    <div class="row">
      <div class="col-12 text-right">
        <el-form
          label-position="top"
          label-width="120px"
          :inline="true"
          class="demo-vehicleForm"
        >
          <el-form-item label="Percentagem" prop="margin">
            <el-input
              @input="inputChanged($event)"
              placeholder="Insira"
              v-model="finalStepForm.totalChargesPercentage"
            ></el-input>
          </el-form-item>
          <el-form-item label="TOTAL" class="text-left" prop="charges">
            <el-input
              @input="inputChanged($event)"
              readonly
              v-model="totalCharges"
            ></el-input>
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
          <el-form-item
            label="TOTAL NF DE SAIDA (BASE + IPI)"
            class="text-left"
            prop="totalLastNF"
          >
            <el-input
              @input="inputChanged($event)"
              readonly
              v-model="totalLastNF"
            ></el-input>
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
          <el-form-item
            label="TOTAL DESEMBOLSO"
            class="text-left"
            prop="totalOutcome"
          >
            <el-input
              @input="inputChanged($event)"
              readonly
              v-model="totalOutcome"
            ></el-input>
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
  name: "FinalStep",
  mixins: [commonFormMixin],
  data() {
    return {
      totalLiquidCostData: "",
      totalOutcome: "",
      totalLastNF: "",
      totalCharges: "1000",
      finalStepForm: {
        invoiceValue: "",
        icms: "",
        valueIcms: "",
        pis: "",
        valuePis: "",
        cofins: "",
        valueCofins: "",
        margin: "",
        valueMargin: "",
        markUpDivisor: "",
        valueMarkUpDivisor: "",
        ipi: "",
        valueIpi: "",
        totalChargesPercentage: "",
      },
    };
  },
  mounted() {
    if (this.getFinalStepFromCache) {
      this.finalStepForm = this.getFinalStepFromCache;
    }
  },
  computed: {
    ...mapGetters(["getFinalStepFromCache"]),
  },
  methods: {
    ...mapActions(["updateFormTreeData"]),
    inputChanged() {
      const dataToUpdate = { ...this.finalStepForm };
      this.updateFormTreeData({ data: dataToUpdate, stepName: "finalStep" });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
