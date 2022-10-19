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
        <input
          class="el-input__inner"
          v-money="money"
          readonly
          @input="inputChanged($event)"
          v-model="costForm.fob"
        />
      </el-form-item>
      <el-form-item label="Frete" prop="shipping">
        <input
          class="el-input__inner"
          v-money="money"
          readonly
          @input="inputChanged($event)"
          v-model="costForm.shipping"
        />
      </el-form-item>
      <el-form-item label="Seguro" prop="insurance">
        <input
          class="el-input__inner"
          v-money="money"
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="costForm.insurance"
        />
      </el-form-item>
      <el-form-item label="THC (Capatazia)" prop="thc">
        <input
          class="el-input__inner"
          v-money="money"
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="costForm.thc"
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
import StringToDouble from "@/utils/common/StringToDouble";
import commonFormMixin from "@/utils/mixins/commonFormMixin";

export default {
  name: "CostData",
  mixins: [commonFormMixin],
  data() {
    return {
      costForm: {
        fob: "0",
        shipping: "0",
        insurance: "0",
        thc: "0",
      },
    };
  },
  mounted() {
    if (this.getCostDataFromCache) {
      this.costForm = this.getCostDataFromCache;
    }
  },
  computed: {
    ...mapGetters(["getCostDataFromCache", "getCurrency"]),
    total: {
      get() {
        return (
          parseFloat(StringToDouble(this.costForm.fob)) +
          parseFloat(StringToDouble(this.costForm.shipping)) +
          parseFloat(StringToDouble(this.costForm.insurance)) +
          parseFloat(StringToDouble(this.costForm.thc))
        ).toFixed(2);
      },
      set() {},
    },
  },
  methods: {
    ...mapActions(["updateFormTreeData"]),
    inputChanged() {
      const dataToUpdate = { ...this.costForm };
      this.updateFormTreeData({ data: dataToUpdate, stepName: "costData" });
    },
  },
};
</script>
