<template>
  <div>
    <el-button type="primary" class="mt-2 mb-2" @click="centerDialogVisible = true">Visualizar PROPOSTA</el-button>
    <el-button type="primary" class="mt-2 mb-2" @click="printResume" v-loading="isLoadingDownloadImage">Gerar RESUMO</el-button>
    <el-form
      label-position="top"
      label-width="120px"
      :inline="true"
      ref="resumeForm"
      class="demo-resumeForm"
    >
      <el-form-item label="Margem Lucro Vision" prop="marginValue">
        <el-input
          v-mask="['#%', '##%', '###%', '#.##%', '##.##%', '###.##%']"
          @blur="inputChanged($event)"
          placeholder="Insira"
          v-model="resumeForm.marginValue"
        ></el-input>
      </el-form-item>
      <el-form-item label="Ganhos Vision" prop="profit">
        <input
          class="el-input__inner"
          v-money="money"
          readonly
          v-model="resumeForm.profit"
        />
      </el-form-item>
    </el-form>

    <el-divider></el-divider>

    <el-form label-position="top" :inline="true">
      <el-form-item
        :label="`Despesas USA - ${getVehicleDataFromCache.currency}`"
        prop="costUsa"
      >
        <input
          class="el-input__inner"
          v-money="getCurrency.moneyConfig"
          @blur="inputChanged($event)"
          v-model="resumeForm.costUsa"
        />
      </el-form-item>
      <el-form-item label="Despesas USA - BRL" prop="valueIcms">
        <input
          class="el-input__inner"
          v-money="money"
          readonly id="readonly"
          v-model="resumeForm.costUsaBrl"
        />
      </el-form-item>
    </el-form>

    <el-form label-position="top" :inline="true">
      <el-form-item
        :label="`Homologação e Assessoria - ${getVehicleDataFromCache.currency}`"
        prop="homologation"
      >
        <input
          class="el-input__inner"
          v-money="getCurrency.moneyConfig"
          readonly
          id="readonly"
          v-model="resumeForm.homologation"
        />
      </el-form-item>
      <el-form-item
        label="Homologação e Assessoria - BRL"
        prop="homologationBrl"
      >
        <input
          @blur="inputChanged($event)"
          class="el-input__inner"
          v-money="money"
          v-model="resumeForm.homologationBrl"
        />
      </el-form-item>
    </el-form>

    <el-divider></el-divider>

    <el-form label-position="top" :inline="true">
      <el-form-item label="TOTAL" prop="total">
        <input
          class="el-input__inner"
          v-money="money"
          readonly
          v-model="resumeForm.total"
        />
      </el-form-item>
    </el-form>

    <el-form label-position="top" :inline="true">
      <el-form-item label="TOTAL" prop="totalCost">
        <input
          class="el-input__inner"
          v-money="money"
          readonly
          v-model="resumeForm.totalCost"
        />
      </el-form-item>
    </el-form>
    <el-dialog
      title="Template Proposta"
      :visible.sync="centerDialogVisible"
      width="100%"
      top
    >
      <ProposalTemplate @finishPDF="centerDialogVisible = false" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancelar</el-button>
      </span>
    </el-dialog>
    <VehicleResumeTemplate />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import commonFormMixin from "@/utils/mixins/commonFormMixin";
import html2canvas from 'html2canvas';

import ResumeDataBaseFileCalc from "@/utils/ResumeDataBaseFileCalc";
import ProposalTemplate from "@/components/ProposalTemplate.vue";
import VehicleResumeTemplate from "@/components/VehicleResumeTemplate.vue";

export default {
  name: "ResumeData",
  mixins: [commonFormMixin],
  components: {
    ProposalTemplate,
    VehicleResumeTemplate,
  },
  data() {
    return {
      centerDialogVisible: false,
      canChangeInput: false,
      inputChangedTimes: 0,
      resumeForm: {
        marginValue: "10%",
        profit: "R$ 0,00",
        costUsa: "R$ 0,00",
        costUsaBrl: "R$ 0,00",
        homologation: "R$ 0,00",
        homologationBrl: "R$ 0,00",
        total: "R$ 0,00",
        totalCost: "R$ 0,00",
      },
      isLoadingDownloadImage: false
    };
  },
  mounted() {
    this.handleCanChangeInput();
    setTimeout(() => {
      this.inputChanged();
    }, 1000);
  },
  computed: {
    ...mapGetters([
      "getResumeDataFromCache",
      "getVehicleDataFromCache",
      "getCurrency",
    ]),
  },
  methods: {
    ...mapActions(["updateFormTreeData", "setLoadingState"]),
    handleUpdatedCalcValues() {
      setTimeout(() => {
        const { costUsaBrl, profit, homologation, total, totalCost } =
          ResumeDataBaseFileCalc(Object.assign({ ...this.resumeForm }, {}));

        this.resumeForm.costUsaBrl = costUsaBrl;
        this.resumeForm.profit = profit;
        this.resumeForm.homologation = homologation;
        this.resumeForm.total = total;
        this.resumeForm.totalCost = totalCost;
      }, 300);
    },
    handleCanChangeInput() {
      setTimeout(() => {
        this.canChangeInput = true;
        if (this.getResumeDataFromCache) {
          this.resumeForm = this.getResumeDataFromCache;
        }
      }, 500);
    },
    inputChanged() {
      if (this.inputChangedTimes >= 1 && this.canChangeInput) {
        const dataToUpdate = { ...this.resumeForm };
        this.updateFormTreeData({ data: dataToUpdate, stepName: "resumeData" });
        this.handleUpdatedCalcValues();
      }
      this.inputChangedTimes += 1;
    },
    printResume() {
      const element = document.getElementById('vehicle-resume-template')
      this.setLoadingState(true);
      this.isLoadingDownloadImage = true;
      this.$notify({
        title: "Atenção",
        message: "Gerando imagem, por favor aguarde...",
        type: "warning",
      });
      const that = this
      html2canvas(element).then(function(canvas) {
        var downloadLink = document.createElement("a");
        downloadLink.href = canvas.toDataURL()
        const date = that.$options.filters.formatDate(new Date().toISOString())
        const imageName = `Cotação ${that.getVehicleDataFromCache.product} em ${ date }.png`
        downloadLink.download = imageName;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      })
      .then(() => this.$notify({
          title: "Sucesso",
          message: "Imagem gerada com sucesso",
          type: "success",
        })
      )
      .catch(() =>
        this.$notify({
          title: "Erro",
          message: "Não foi possível gerar a imagem",
          type: "error",
        })
      )
      .finally(() => {
        this.isLoadingDownloadImage = false;
        this.setLoadingState(false)
      });
    },
  },
};
</script>
