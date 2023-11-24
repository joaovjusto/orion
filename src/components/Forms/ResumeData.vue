<template>
  <div>
    <strong
      >Despesas que não incidem na Nota Fiscal</strong
    >
    <hr />
    <el-form label-position="top" label-width="120px" :inline="true">
      <el-form-item label="Dólar Paralelo" prop="parallelCurrency">
        <input
          @input.once="inputChanged($event)"
          @keydown="inputChanged($event)"
          @keyup="inputChanged($event)"
          class="el-input__inner"
          v-money="getCurrency.moneyConfig"
          v-model="resumeForm.parallelCurrency"
        />
      </el-form-item>
      <hr />
      <el-form-item label="Modificador Sales Tax" prop="salesTaxModifier">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-mask="['#%', '##%', '###%', '#.##%', '##.##%', '###.##%']"
          v-model="resumeForm.salesTaxModifier"
        ></el-input>
      </el-form-item>
      <el-form-item label="Sales Tax ou IVA" prop="salesTax">
        <input
          class="el-input__inner"
          v-money="getCurrency.moneyConfig"
          id="readonly"
          readonly
          v-model="resumeForm.salesTax"
        />
      </el-form-item>
      <hr />
      <el-form-item
        label="Comissão AG compras exterior"
        prop="exteriorComission"
      >
        <input
          class="el-input__inner"
          v-money="getCurrency.moneyConfig"
          @input.once="inputChanged($event)"
          @keydown="inputChanged($event)"
          @keyup="inputChanged($event)"
          v-model="resumeForm.exteriorComission"
        />
      </el-form-item>
      <el-form-item label="Coleta do carro no exterior" prop="carCollect">
        <input
          class="el-input__inner"
          v-money="getCurrency.moneyConfig"
          @input.once="inputChanged($event)"
          @keydown="inputChanged($event)"
          @keyup="inputChanged($event)"
          v-model="resumeForm.carCollect"
        />
      </el-form-item>
      <el-form-item
        label="Acessórios por fora + taxa do Dealer:"
        prop="acessoryDealer"
      >
        <input
          class="el-input__inner"
          v-money="getCurrency.moneyConfig"
          @input.once="inputChanged($event)"
          @keydown="inputChanged($event)"
          @keyup="inputChanged($event)"
          v-model="resumeForm.acessoryDealer"
        />
      </el-form-item>
      <el-form-item label="Ágio sobre o preço de site" prop="agio">
        <input
          class="el-input__inner"
          v-money="getCurrency.moneyConfig"
          @input.once="inputChanged($event)"
          @keydown="inputChanged($event)"
          @keyup="inputChanged($event)"
          v-model="resumeForm.agio"
        />
      </el-form-item>
      <el-form-item
        label="Validação na alfândega no exterior"
        prop="alfandegaryValidation"
      >
        <input
          class="el-input__inner"
          v-money="getCurrency.moneyConfig"
          @input.once="inputChanged($event)"
          @keydown="inputChanged($event)"
          @keyup="inputChanged($event)"
          v-model="resumeForm.alfandegaryValidation"
        />
      </el-form-item>
      <el-form-item label="Aluguel do Container" prop="containerRentValue">
        <input
          class="el-input__inner"
          v-money="getCurrency.moneyConfig"
          @input.once="inputChanged($event)"
          @keydown="inputChanged($event)"
          @keyup="inputChanged($event)"
          v-model="resumeForm.containerRentValue"
        />
      </el-form-item>
      <el-form-item label="Estufagem do Container" prop="stuffing">
        <input
          class="el-input__inner"
          v-money="getCurrency.moneyConfig"
          @input.once="inputChanged($event)"
          @keydown="inputChanged($event)"
          @keyup="inputChanged($event)"
          v-model="resumeForm.stuffing"
        />
      </el-form-item>
      <el-form-item label="Frete Exterior (Porto)" prop="shippingFee">
        <input
          class="el-input__inner"
          v-money="getCurrency.moneyConfig"
          @input.once="inputChanged($event)"
          @keydown="inputChanged($event)"
          @keyup="inputChanged($event)"
          v-model="resumeForm.shippingFee"
        />
      </el-form-item>
      <el-form-item label="Homologações" prop="homologation">
        <input
          class="el-input__inner"
          v-money="getCurrency.moneyConfig"
          @input.once="inputChanged($event)"
          @keydown="inputChanged($event)"
          @keyup="inputChanged($event)"
          v-model="resumeForm.homologation"
        />
      </el-form-item>

      <el-divider />

      <el-form-item
        label="Total de despesas no exterior"
        prop="totalExteriorCosts"
      >
        <input
          class="el-input__inner"
          id="readonly"
          readonly
          v-money="getCurrency.moneyConfig"
          v-model="resumeForm.totalExteriorCosts"
        />
      </el-form-item>
      <el-form-item label="Total em reais" prop="totalCostReais">
        <input
          class="el-input__inner"
          id="readonly"
          readonly
          v-money="money"
          v-model="resumeForm.totalCostReais"
        />
      </el-form-item>
      <hr />
      <el-form-item
        label="Percentagem VISION COMEX"
        prop="visionLeadValuePercent"
      >
        <input
          class="el-input__inner"
          @input.once="inputChanged($event)"
          @keydown="inputChanged($event)"
          @keyup="inputChanged($event)"
          v-mask="['#%', '##%', '###%', '#.##%', '##.##%', '###.##%']"
          placeholder="Insira"
          v-model="resumeForm.visionLeadValuePercent"
        />
      </el-form-item>
      <el-form-item label="Gestão completa VISION COMEX" prop="visionLeadValue">
        <input
          class="el-input__inner"
          id="readonly"
          readonly
          v-money="money"
          v-model="resumeForm.visionLeadValue"
        />
      </el-form-item>
      <hr />
      <el-form-item label="Custo Total da importação" prop="totalImportCost">
        <input
          class="el-input__inner"
          id="readonly"
          readonly
          v-money="money"
          v-model="resumeForm.totalImportCost"
        />
      </el-form-item>
      <!-- <el-form-item label="Recuperação do IVA" prop="iva">
        <input
          class="el-input__inner"
          id="readonly"
          readonly
          v-money="money"
          v-model="resumeForm.iva"
        />
      </el-form-item>
      <el-form-item label="Saldo Final" prop="finalValue">
        <input
          class="el-input__inner"
          id="readonly"
          readonly
          v-money="money"
          v-model="resumeForm.finalValue"
        />
      </el-form-item> -->
    </el-form>
    <el-dialog
      title="Template Proposta"
      :visible.sync="centerDialogVisible"
      width="100%"
      top
    >
      <ProposalTemplate :data="resumeForm" @finishPDF="centerDialogVisible = false" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancelar</el-button>
      </span>
    </el-dialog>
    <VehicleResumeTemplate />
    <el-divider />
    <div class="row">
      <div class="col-12 text-right">
        <el-button
          type="secondary"
          class="mt-2 mb-2"
          v-loading="isLoadingStorage"
          @click="saveOrder"
          >Salvar Proposta em banco</el-button
        >
        <el-button
          type="primary"
          class="mt-2 mb-2"
          @click="centerDialogVisible = true"
          >Visualizar PROPOSTA</el-button
        >
        <el-button
          type="primary"
          class="mt-2 mb-2"
          @click="printResume"
          v-loading="isLoadingDownloadImage"
          >Gerar RESUMO</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import commonFormMixin from "@/utils/mixins/commonFormMixin";
import html2canvas from "html2canvas";

import ResumeDataBaseFileCalc from "@/utils/ResumeDataBaseFileCalc";
import ProposalTemplate from "@/components/ProposalTemplate.vue";
import VehicleResumeTemplate from "@/components/VehicleResumeTemplate.vue";
import { Proposal } from "@/models";
import { ProposalService } from "@/services";

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
        acessoryDealer: "0,00",
        parallelCurrency: "0,00",
        salesTaxModifier: "0%",
        visionLeadValuePercent: "0%",
        salesTax: "0,00",
        exteriorComission: "0,00",
        carCollect: "0,00",
        agio: "0,00",
        alfandegaryValidation: "0,00",
        containerRentValue: "0,00",
        stuffing: "0,00",
        shippingFee: "0,00",
        homologation: "0,00",
        totalExteriorCosts: "0,00",
        totalCostReais: "0,00",
        visionLeadValue: "0,00",
        totalImportCost: "0,00",
        iva: "0,00",
        finalValue: "0,00",
      },
      isLoadingDownloadImage: false,
      isLoadingStorage: false,
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
      "getImagesCarTemplate",
      "getResumeDataFromCache",
      "getVehicleDataFromCache",
      "getCurrency",
      "getCostDataFromCache",
      "getTributeDataFromCache",
      "getImportDataFromCache",
      "getUserFromCache",
      "getProposal",
    ]),
  },
  methods: {
    ...mapActions(["updateFormTreeData", "setLoadingState"]),
    handleUpdatedCalcValues() {
      setTimeout(() => {
        const {
          salesTax,
          totalExteriorCosts,
          totalCostReais,
          visionLeadValue,
          totalImportCost,
          iva,
          finalValue,
        } = ResumeDataBaseFileCalc(Object.assign({ ...this.resumeForm }, {}));

        this.resumeForm.salesTax = salesTax;
        this.resumeForm.totalExteriorCosts = totalExteriorCosts;
        this.resumeForm.totalCostReais = totalCostReais;
        this.resumeForm.visionLeadValue = visionLeadValue;
        this.resumeForm.totalImportCost = totalImportCost;
        this.resumeForm.iva = iva;
        this.resumeForm.finalValue = finalValue;
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
      const element = document.getElementById("vehicle-resume-template");
      this.setLoadingState(true);
      this.isLoadingDownloadImage = true;
      this.$notify({
        title: "Atenção",
        message: "Gerando imagem, por favor aguarde...",
        type: "warning",
      });
      const that = this;
      html2canvas(element)
        .then(function (canvas) {
          var downloadLink = document.createElement("a");
          downloadLink.href = canvas.toDataURL();
          const date = that.$options.filters.formatDate(
            new Date().toISOString()
          );
          const imageName = `Cotação ${that.getVehicleDataFromCache.product} em ${date}.png`;
          downloadLink.download = imageName;

          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        })
        .then(() =>
          this.$notify({
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
          this.setLoadingState(false);
        });
    },
    async saveOrder() {
      this.isLoadingStorage = true;
      try {
        let proposal = this.getProposal;
        if (!proposal.id) {
          proposal = new Proposal();
        }

        proposal.vehicle = this.getVehicleDataFromCache;
        proposal.currency = this.getCurrency;
        proposal.cost = this.getCostDataFromCache;
        proposal.tribute = this.getTributeDataFromCache;
        proposal.import = this.getImportDataFromCache;
        proposal.user = this.getUserFromCache.email;
        proposal.resume = this.getResumeDataFromCache;
        proposal.images = this.getImagesCarTemplate;
        await new ProposalService().save(proposal);

        this.$notify({
          title: "Sucesso",
          message: "Proposta salva com sucesso",
          type: "success",
        });
      } catch (error) {
        console.error(error);
        this.$notify({
          title: "Erro",
          message: "Ocorreu um erro ao tentar salvar a proposta",
          type: "error",
        });
      } finally {
        this.isLoadingStorage = false;
      }
    },
  },
};
</script>
