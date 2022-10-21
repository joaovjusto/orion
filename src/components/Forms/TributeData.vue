<template>
  <div>
    <el-form :model="tributeForm" label-position="top">
      <el-form-item label="Tipo de Veículo" prop="currency">
        <el-select
          @change="updateVehicleData()"
          v-model="tributeForm.vehicleType"
          placeholder="Selecione"
        >
          <el-option
            v-for="(item, i) in vehicleBaseData"
            :key="i"
            :label="item.type"
            :value="item.type"
          >
          </el-option>
        </el-select>
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
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-mask="['#%', '##%', '###%', '#.##%', '##.##%', '###.##%']"
          v-model="tributeForm.ii"
        ></el-input>
      </el-form-item>
      <el-form-item label="Valor II" prop="valueIi">
        <input
          class="el-input__inner"
          v-money="money"
          placeholder="Insira"
          @input="inputChanged($event)"
          readonly
          v-model="tributeForm.valueIi"
        />
      </el-form-item>
    </el-form>
    <el-form label-position="top" :inline="true">
      <el-form-item label="IPI" prop="ipi">
        <el-input
          v-mask="['#%', '##%', '###%', '#.##%', '##.##%', '###.##%']"
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="tributeForm.ipi"
        ></el-input>
      </el-form-item>
      <el-form-item label="Valor IPI" prop="valueIpi">
        <input
          class="el-input__inner"
          v-money="money"
          placeholder="Insira"
          @input="inputChanged($event)"
          readonly
          v-model="tributeForm.valueIpi"
        />
      </el-form-item>
    </el-form>
    <el-form label-position="top" :inline="true">
      <el-form-item label="PIS" prop="pis">
        <el-input
          v-mask="['#%', '##%', '###%', '#.##%', '##.##%', '###.##%']"
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="tributeForm.pis"
        ></el-input>
      </el-form-item>
      <el-form-item label="Valor IPI" prop="valuePis">
        <input
          class="el-input__inner"
          v-money="money"
          placeholder="Insira"
          @input="inputChanged($event)"
          readonly
          v-model="tributeForm.valuePis"
        />
      </el-form-item>
    </el-form>
    <el-form label-position="top" :inline="true">
      <el-form-item label="COFINS" prop="cofins">
        <el-input
          v-mask="['#%', '##%', '###%', '#.##%', '##.##%', '###.##%']"
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="tributeForm.cofins"
        ></el-input>
      </el-form-item>
      <el-form-item label="Valor COFINS" prop="valueCofins">
        <input
          class="el-input__inner"
          v-money="money"
          placeholder="Insira"
          @input="inputChanged($event)"
          readonly
          v-model="tributeForm.valueCofins"
        />
      </el-form-item>
    </el-form>
    <el-form label-position="top" :inline="true">
      <el-form-item label="TUS" prop="tus">
        <el-input
          v-mask="['#%', '##%', '###%', '#.##%', '##.##%', '###.##%']"
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="tributeForm.tus"
        ></el-input>
      </el-form-item>
      <el-form-item label="Valor TUS" prop="valueTus">
        <input
          class="el-input__inner"
          v-money="money"
          placeholder="Insira"
          @input="inputChanged($event)"
          v-model="tributeForm.valueTus"
        />
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
          <el-form-item label="TOTAL" class="text-left" prop="total">
            <input
              class="el-input__inner"
              v-money="money"
              @input="inputChanged($event)"
              readonly
              v-model="total"
            />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import { vehicleBaseData } from "./data/vehicleBaseData";

import StringToDouble from "@/utils/common/StringToDouble";
import commonFormMixin from "@/utils/mixins/commonFormMixin";

export default {
  name: "TributeData",
  mixins: [commonFormMixin],
  data() {
    return {
      canChangeInput: false,
      inputChangedTimes: 0,
      vehicleBaseData,
      tributeForm: {
        vehicleType: "",
        ii: "0%",
        valueIi: "",
        ipi: "0%",
        valueIpi: "",
        pis: "0%",
        valuePis: "",
        cofins: "0%",
        valueCofins: "",
        tus: "",
        valueTus: "R$ 0,00",
      },
    };
  },
  mounted() {
    this.handleCanChangeInput();
  },
  computed: {
    ...mapGetters(["getTributeDataFromCache"]),
    total: {
      get() {
        return (
          parseFloat(StringToDouble(this.tributeForm.valueIi)) +
          parseFloat(StringToDouble(this.tributeForm.valueIpi)) +
          parseFloat(StringToDouble(this.tributeForm.valuePis)) +
          parseFloat(StringToDouble(this.tributeForm.valueCofins)) +
          parseFloat(StringToDouble(this.tributeForm.valueTus))
        ).toFixed(2);
      },
      set() {},
    },
  },
  methods: {
    ...mapActions(["updateFormTreeData"]),
    handleCanChangeInput() {
      setTimeout(() => {
        this.canChangeInput = true;
        if (this.getTributeDataFromCache) {
          this.tributeForm = this.getTributeDataFromCache;
        }
      }, 500);
    },
    inputChanged(_, dataToUpdateParam) {
      if (this.inputChangedTimes >= 1 && this.canChangeInput) {
        let dataToUpdate = { ...this.tributeForm };
        if (dataToUpdateParam) {
          dataToUpdate = dataToUpdateParam;
        }
        this.updateFormTreeData({
          data: dataToUpdate,
          stepName: "tributeData",
        });
      }
      this.inputChangedTimes += 1;
    },
    updateVehicleData() {
      const [selectedValue] = this.vehicleBaseData.filter(
        (value) => this.tributeForm.vehicleType === value.type
      );
      const { ii, ipi } = selectedValue;
      this.tributeForm.ii = ii;
      this.tributeForm.ipi = ipi;

      // Updating cache
      this.inputChanged();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
