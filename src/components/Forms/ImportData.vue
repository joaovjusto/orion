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
      <el-form-item label="Taxa Siscomex" prop="siscomex">
        <input
          class="el-input__inner"
          v-money="money"
          placeholder="Insira"
          @input="inputChanged($event)"
          v-model="importForm.siscomex"
        />
      </el-form-item>
      <el-form-item label="Marinha Mercante" prop="marineMerchant">
        <input
          class="el-input__inner"
          v-money="money"
          placeholder="Insira"
          readonly
          id="readonly"
          @input="inputChanged($event)"
          v-model="importForm.marineMerchant"
        />
      </el-form-item>
      <el-form-item label="DTC/DTA remoção EADI" prop="DTC">
        <input
          class="el-input__inner"
          v-money="money"
          placeholder="Insira"
          @input="inputChanged($event)"
          v-model="importForm.DTC"
        />
      </el-form-item>
      <el-form-item label="S.D.A" prop="sda">
        <input
          class="el-input__inner"
          v-money="money"
          placeholder="Insira"
          @input="inputChanged($event)"
          v-model="importForm.sda"
        />
      </el-form-item>
      <el-form-item label="Armazenagem 1 Período" prop="storageOne">
        <input
          class="el-input__inner"
          v-money="money"
          placeholder="Insira"
          @input="inputChanged($event)"
          v-model="importForm.storageOne"
        />
      </el-form-item>
      <el-form-item label="Emissão de LI" prop="li">
        <input
          class="el-input__inner"
          v-money="money"
          placeholder="Insira"
          @input="inputChanged($event)"
          v-model="importForm.li"
        />
      </el-form-item>
      <el-form-item label="Capatazia" prop="capatazia">
        <input
          class="el-input__inner"
          v-money="money"
          placeholder="Insira"
          @input="inputChanged($event)"
          v-model="importForm.capatazia"
        />
      </el-form-item>
      <el-form-item label="Armazenagem Porto Seco" prop="storageSeco">
        <input
          class="el-input__inner"
          v-money="money"
          placeholder="Insira"
          @input="inputChanged($event)"
          v-model="importForm.storageSeco"
        />
      </el-form-item>
      <el-form-item label="Levante Container" prop="levant">
        <input
          class="el-input__inner"
          v-money="money"
          placeholder="Insira"
          @input="inputChanged($event)"
          readonly
          id="readonly"
          v-model="importForm.levant"
        />
      </el-form-item>
      <el-form-item label="Pesagem Container" prop="containerWeight">
        <input
          class="el-input__inner"
          v-money="money"
          placeholder="Insira"
          @input="inputChanged($event)"
          readonly
          id="readonly"
          v-model="importForm.containerWeight"
        />
      </el-form-item>
      <el-form-item label="L.I Ibama" prop="ibamaLi">
        <input
          class="el-input__inner"
          v-money="money"
          placeholder="Insira"
          @input="inputChanged($event)"
          v-model="importForm.ibamaLi"
        />
      </el-form-item>
      <el-form-item label="Taxa ADM" prop="admTax">
        <input
          class="el-input__inner"
          v-money="money"
          placeholder="Insira"
          @input="inputChanged($event)"
          v-model="importForm.admTax"
        />
      </el-form-item>
      <el-form-item label="Desembaraço" prop="desembaraco">
        <input
          class="el-input__inner"
          v-money="money"
          placeholder="Insira"
          @input="inputChanged($event)"
          v-model="importForm.desembaraco"
        />
      </el-form-item>
      <el-form-item label="Prestação de serviço" prop="serviceCost">
        <input
          class="el-input__inner"
          v-money="money"
          placeholder="Insira"
          @input="inputChanged($event)"
          v-model="importForm.serviceCost"
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
          class="demo-importForm"
        >
          <el-form-item
            label="TOTAL DESPESAS COM DESEMBARAÇO"
            class="text-left"
            prop="thc"
          >
            <input
              class="el-input__inner"
              v-money="money"
              @input="inputChanged($event)"
              readonly
              id="readonly"
              v-model="total"
            />
          </el-form-item>
          <el-form-item
            label="TOTAL DOS CUSTOS DE IMPORTAÇÃO EM D.I. + TAXAS PORTUÁRIAS + TAXAS ADM."
            class="text-left"
            prop="totalCostImp"
          >
            <input
              class="el-input__inner"
              v-money="money"
              @input="inputChanged($event)"
              readonly
              id="readonly"
              v-model="importForm.totalCostImp"
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
  name: "ImportData",
  mixins: [commonFormMixin],
  data() {
    return {
      canChangeInput: false,
      inputChangedTimes: 0,
      importForm: {
        totalCostImp: "",
        siscomex: "",
        marineMerchant: "",
        DTC: "",
        sda: "",
        storageOne: "",
        li: "",
        capatazia: "",
        storageSeco: "",
        levant: "",
        containerWeight: "",
        ibamaLi: "",
        admTax: "",
        desembaraco: "",
        serviceCost: "",
      },
    };
  },
  mounted() {
    this.handleCanChangeInput();
  },
  computed: {
    ...mapGetters(["getImportDataFromCache"]),
    total: {
      get() {
        return (
          parseFloat(StringToDouble(this.importForm.siscomex)) +
          parseFloat(StringToDouble(this.importForm.marineMerchant)) +
          parseFloat(StringToDouble(this.importForm.DTC)) +
          parseFloat(StringToDouble(this.importForm.sda)) +
          parseFloat(StringToDouble(this.importForm.storageOne)) +
          parseFloat(StringToDouble(this.importForm.li)) +
          parseFloat(StringToDouble(this.importForm.capatazia)) +
          parseFloat(StringToDouble(this.importForm.storageSeco)) +
          parseFloat(StringToDouble(this.importForm.levant)) +
          parseFloat(StringToDouble(this.importForm.containerWeight)) +
          parseFloat(StringToDouble(this.importForm.ibamaLi)) +
          parseFloat(StringToDouble(this.importForm.admTax)) +
          parseFloat(StringToDouble(this.importForm.desembaraco)) +
          parseFloat(StringToDouble(this.importForm.serviceCost))
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
        if (this.getImportDataFromCache) {
          this.importForm = this.getImportDataFromCache;
        }
      }, 500);
    },
    inputChanged() {
      if (this.inputChangedTimes >= 1 && this.canChangeInput) {
        const dataToUpdate = { ...this.importForm };
        this.updateFormTreeData({ data: dataToUpdate, stepName: "importData" });
      }
      this.inputChangedTimes += 1;
    },
  },
};
</script>
