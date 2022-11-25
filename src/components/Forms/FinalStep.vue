<template>
  <div>
    <el-form
      label-position="top"
      label-width="120px"
      :inline="true"
      class="demo-finalStepForm"
    >
      <el-form-item
        label="CUSTO LIQUIDO DE IMPORTAÇÃO - LUXOR"
        class="text-left"
        prop="thc"
      >
        <input
          class="el-input__inner"
          v-money="money"
          readonly
          v-model="finalStepForm.totalLiquidCostData"
        />
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
        <input
          class="el-input__inner"
          v-money="money"
          readonly
          v-model="finalStepForm.invoiceValue"
        />
      </el-form-item>
    </el-form>

    <el-form label-position="top" :inline="true">
      <el-form-item label="ICMS" prop="icms">
        <el-input
          v-mask="['#%', '##%', '###%', '#.##%', '##.##%', '###.##%']"
          @input="inputChanged($event)"
          placeholder="Insira"
          readonly
          v-model="finalStepForm.icms"
        ></el-input>
      </el-form-item>
      <el-form-item label="Valor" prop="valueIcms">
        <input
          class="el-input__inner"
          v-money="money"
          readonly
          v-model="finalStepForm.valueIcms"
        />
      </el-form-item>
    </el-form>

    <el-form label-position="top" :inline="true">
      <el-form-item label="PIS" prop="pis">
        <el-input
          v-mask="['#%', '##%', '###%', '#.##%', '##.##%', '###.##%']"
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="finalStepForm.pis"
        ></el-input>
      </el-form-item>
      <el-form-item label="Valor" prop="valuePis">
        <input
          class="el-input__inner"
          v-money="money"
          readonly
          v-model="finalStepForm.valuePis"
        />
      </el-form-item>
    </el-form>

    <el-form label-position="top" :inline="true">
      <el-form-item label="COFINS" prop="cofins">
        <el-input
          v-mask="['#%', '##%', '###%', '#.##%', '##.##%', '###.##%']"
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="finalStepForm.cofins"
        ></el-input>
      </el-form-item>
      <el-form-item label="Valor" prop="valueCofins">
        <input
          class="el-input__inner"
          v-money="money"
          readonly
          v-model="finalStepForm.valueCofins"
        />
      </el-form-item>
    </el-form>

    <el-form label-position="top" :inline="true">
      <el-form-item label="Margem" prop="margin">
        <el-input
          v-mask="['#%', '##%', '###%', '#.##%', '##.##%', '###.##%']"
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="finalStepForm.margin"
        ></el-input>
      </el-form-item>
      <el-form-item label="Valor" prop="valueMargin">
        <input
          class="el-input__inner"
          v-money="money"
          readonly
          v-model="finalStepForm.valueMargin"
        />
      </el-form-item>
    </el-form>

    <el-form label-position="top" :inline="true">
      <el-form-item label="IPI" prop="ipi">
        <el-input
          readonly
          v-mask="['#%', '##%', '###%', '#.##%', '##.##%', '###.##%']"
          placeholder="Insira"
          v-model="finalStepForm.ipi"
        ></el-input>
      </el-form-item>
      <el-form-item label="Valor" prop="valueIpi">
        <input
          class="el-input__inner"
          v-money="money"
          readonly
          v-model="finalStepForm.valueIpi"
        />
      </el-form-item>
    </el-form>

    <el-form label-position="top" :inline="true">
      <el-form-item label="Mark Up Divisor" prop="markUpDivisor">
        <el-input
          readonly
          v-mask="['#%', '##%', '###%', '#.##%', '##.##%', '###.##%']"
          placeholder="Insira"
          v-model="finalStepForm.markUpDivisor"
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
          <el-form-item label="Percentagem" prop="totalChargesPercentage">
            <el-input
              readonly
              v-mask="['#%', '##%', '###%', '#.##%', '##.##%', '###.##%']"
              placeholder="Insira"
              v-model="finalStepForm.totalChargesPercentage"
            ></el-input>
          </el-form-item>
          <el-form-item label="TOTAL" class="text-left" prop="charges">
            <input
              class="el-input__inner"
              v-money="money"
              readonly
              v-model="finalStepForm.totalCharges"
            />
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
            <input
              class="el-input__inner"
              v-money="money"
              readonly
              v-model="finalStepForm.totalLastNF"
            />
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
            <input
              class="el-input__inner"
              v-money="money"
              readonly
              v-model="finalStepForm.totalOutcome"
            />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import commonFormMixin from "@/utils/mixins/commonFormMixin";

import FinalStepBaseFileCalc from "@/utils/FinalStepBaseFileCalc";

export default {
  name: "FinalStep",
  mixins: [commonFormMixin],
  data() {
    return {
      canChangeInput: false,
      inputChangedTimes: 0,
      finalStepForm: {
        totalCharges: "R$ 0,00",
        totalOutcome: "R$ 0,00",
        totalLastNF: "R$ 0,00",
        totalLiquidCostData: "R$ 0,00",
        invoiceValue: "",
        icms: "0%",
        valueIcms: "",
        pis: "0%",
        valuePis: "",
        cofins: "0%",
        valueCofins: "",
        margin: "0%",
        valueMargin: "",
        markUpDivisor: "0%",
        ipi: "0%",
        valueIpi: "",
        totalChargesPercentage: "0%",
      },
      oldFinalStepFormValue: {},
    };
  },
  mounted() {
    this.handleCanChangeInput();
  },
  computed: {
    ...mapGetters(["getFinalStepFromCache"]),
  },
  methods: {
    ...mapActions(["updateFormTreeData"]),
    handleCanChangeInput() {
      setTimeout(() => {
        this.canChangeInput = true;
        if (this.getFinalStepFromCache) {
          this.finalStepForm = {
            ...this.finalStepForm,
            ...this.getFinalStepFromCache,
          };
        }
      }, 500);
    },
    handleUpdatedCalcValues() {
      setTimeout(() => {
        const {
          totalLiquidCostData,
          invoiceValue,
          valueIcms,
          valuePis,
          valueCofins,
          valueMargin,
          ipi,
          valueIpi,
          markUpDivisor,
          totalChargesPercentage,
          totalCharges,
          totalLastNF,
          totalOutcome,
        } = FinalStepBaseFileCalc(Object.assign({ ...this.finalStepForm }, {}));

        this.finalStepForm.totalChargesPercentage = totalChargesPercentage;
        this.finalStepForm.totalLiquidCostData = totalLiquidCostData;
        this.finalStepForm.invoiceValue = invoiceValue;
        this.finalStepForm.valueIcms = valueIcms;
        this.finalStepForm.valuePis = valuePis;
        this.finalStepForm.valueCofins = valueCofins;
        this.finalStepForm.valueMargin = valueMargin;
        this.finalStepForm.ipi = ipi;
        this.finalStepForm.valueIpi = valueIpi;
        this.finalStepForm.markUpDivisor = markUpDivisor;
        this.finalStepForm.totalCharges = totalCharges;
        this.finalStepForm.totalLastNF = totalLastNF;
        this.finalStepForm.totalOutcome = totalOutcome;
      }, 300);
    },
    inputChanged() {
      if (this.inputChangedTimes >= 1 && this.canChangeInput) {
        const dataToUpdate = { ...this.finalStepForm };
        this.updateFormTreeData({ data: dataToUpdate, stepName: "finalStep" });
        this.handleUpdatedCalcValues();
      }
      this.inputChangedTimes += 1;
    },
  },
};
</script>
