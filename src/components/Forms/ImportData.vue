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
      <el-form-item label="Descarga no porto" prop="unloading">
        <input
          class="el-input__inner"
          v-money="money"
          placeholder="Insira"
          readonly
          id="readonly"
          @input="inputChanged($event)"
          v-model="importForm.unloading"
        />
      </el-form-item>
      <el-form-item label="Armazenagem EADI" prop="storage">
        <input
          class="el-input__inner"
          v-money="money"
          placeholder="Insira"
          readonly
          id="readonly"
          @input="inputChanged($event)"
          v-model="importForm.storage"
        />
      </el-form-item>
      <el-form-item label="AFRMM" prop="afrmm">
        <input
          class="el-input__inner"
          v-money="money"
          readonly
          id="readonly"
          placeholder="Insira"
          @input="inputChanged($event)"
          v-model="importForm.afrmm"
        />
      </el-form-item>
      <!-- <el-form-item label="DTC" prop="dtc">
        <input
          class="el-input__inner"
          v-money="money"
          placeholder="Insira"
          @input="inputChanged($event)"
          v-model="importForm.dtc"
        />
      </el-form-item> -->
      <el-form-item label="Desova e devolução CTR" prop="ctr">
        <input
          class="el-input__inner"
          v-money="money"
          placeholder="Insira"
          @input="inputChanged($event)"
          v-model="importForm.ctr"
        />
      </el-form-item>
      <el-form-item label="Despacho" prop="dispatch">
        <input
          class="el-input__inner"
          v-money="money"
          placeholder="Insira"
          @input="inputChanged($event)"
          v-model="importForm.dispatch"
        />
      </el-form-item>
      <el-form-item label="Documentos" prop="docs">
        <input
          class="el-input__inner"
          v-money="money"
          placeholder="Insira"
          @input="inputChanged($event)"
          v-model="importForm.docs"
        />
      </el-form-item>
      <el-form-item label="S.D.A" prop="sda">
        <input
          class="el-input__inner"
          v-money="money"
          placeholder="Insira"
          @input="inputChanged($event)"
          readonly
          id="readonly"
          v-model="importForm.sda"
        />
      </el-form-item>
      <el-form-item label="Liberação de BL" prop="blLiberation">
        <input
          class="el-input__inner"
          v-money="money"
          placeholder="Insira"
          @input="inputChanged($event)"
          v-model="importForm.blLiberation"
        />
      </el-form-item>
      <el-form-item label="Seguro" prop="assurance">
        <input
          class="el-input__inner"
          v-money="money"
          placeholder="Insira"
          @input="inputChanged($event)"
          readonly
          id="readonly"
          v-model="importForm.assurance"
        />
      </el-form-item>
      <el-form-item label="Plataforma Até BC" prop="plataform">
        <input
          class="el-input__inner"
          v-money="money"
          placeholder="Insira"
          @input="inputChanged($event)"
          readonly
          id="readonly"
          v-model="importForm.plataform"
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
            label="TOTAL DESPESAS ADUANEIRAS"
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
        unloading: "",
        storage: "",
        afrmm: "",
        // dtc: "",
        plataform: "",
        ctr: "",
        docs: "",
        sda: "",
        blLiberation: "",
        assurance: "",
        dispatch: "",
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
          parseFloat(StringToDouble(this.importForm.unloading)) +
          parseFloat(StringToDouble(this.importForm.storage)) +
          parseFloat(StringToDouble(this.importForm.afrmm)) +
          // parseFloat(StringToDouble(this.importForm.dtc)) +
          parseFloat(StringToDouble(this.importForm.plataform)) +
          parseFloat(StringToDouble(this.importForm.ctr)) +
          parseFloat(StringToDouble(this.importForm.docs)) +
          parseFloat(StringToDouble(this.importForm.sda)) +
          parseFloat(StringToDouble(this.importForm.blLiberation)) +
          parseFloat(StringToDouble(this.importForm.assurance)) +
          parseFloat(StringToDouble(this.importForm.dispatch))
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
