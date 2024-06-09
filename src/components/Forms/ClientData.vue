<template>
  <div>
    <el-form label-position="top" label-width="120px" :inline="true">
      <el-form-item label="Selecione de um template" prop="template">
        <el-select
          v-model="selectedCustomerTemplate"
          placeholder="Selecione"
          :loading="isLoadingCostumerTemplate"
          filterable
          clearable
          @change="onChangeTemplate"
          @clear="onClearTemplate"
        >
          <el-option
            v-for="template in customerTemplates"
            :key="template.id"
            :label="template.name"
            :value="template.id"
          >
            <div class="select-template-content">
              <span>{{ template.name }} (CPF: {{ template.cpf }})</span>
            </div>
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-form
      :model="clientForm"
      label-position="top"
      ref="clientForm"
      label-width="120px"
      :inline="true"
      class="demo-clientForm"
    >
      <el-form-item label="Nome" prop="name">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira nome do contratante"
          v-model="clientForm.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="CPF" prop="cpf">
        <el-input
          v-mask="['###.###.###-##']"
          @input="inputChanged($event)"
          placeholder="Insira o CPF"
          v-model="clientForm.cpf"
        ></el-input>
      </el-form-item>
      <el-form-item label="RG" prop="rg">
        <el-input
          v-mask="['##.###.###-#']"
          @input="inputChanged($event)"
          placeholder="Insira o RG"
          v-model="clientForm.rg"
        ></el-input>
      </el-form-item>
      <el-form-item label="Estado Civil" prop="civilState">
        <!-- <el-form-item label="Selecione de um template" prop="template"> -->
        <el-select v-model="clientForm.civilState" placeholder="Selecione">
          <el-option
            v-for="item in civilStateTemplates"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Profissão" prop="occupation">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira a ocupação"
          v-model="clientForm.occupation"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-form
      :model="clientForm"
      label-position="top"
      ref="clientForm"
      label-width="120px"
      :inline="true"
      class="demo-clientForm"
    >
      <el-form-item label="Endereço Completo" prop="address">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira o endereço"
          v-model="clientForm.address"
        ></el-input>
      </el-form-item>
      <el-form-item label="Complemento" prop="complement">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira o complemento"
          v-model="clientForm.complement"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-form
      :model="editorData"
      label-position="top"
      ref="editorData"
      label-width="120px"
      :inline="true"
      class="demo-editorData"
    >
      <el-form-item label="Modelo de contrato">
        <ckeditor
          :editor="editor"
          v-model="editorData"
          :config="editorConfig"
        ></ckeditor>
      </el-form-item>
    </el-form>
    <div class="vehicle-template-actions">
      <el-tooltip
        class="item"
        effect="dark"
        content="Salva todas as informações do cliente para serem usadas posteriomente através da seleção no início do formulário"
        placement="top-start"
      >
        <el-button @click="saveCostumer" :loading="isLoadingCostumerTemplate">
          Salvar como template
        </el-button>
      </el-tooltip>
      <el-button
        v-if="selectedCustomerTemplate != ''"
        type="danger"
        icon="el-icon-delete"
        circle
        :loading="isLoadingCostumerTemplate"
        @click="deleteCostumer"
      ></el-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import commonFormMixin from "@/utils/mixins/commonFormMixin";
import { CostumerService } from "@/services";
import { Costumer } from "@/models";

import ModeloContrato from "./data/modelo_contrato.js";

export default {
  name: "ClientData",
  mixins: [commonFormMixin],
  data() {
    return {
      civilStateTemplates: [
        {
          value: 1,
          label: "Solteiro (a)",
        },
        {
          value: 2,
          label: "Casado (a)",
        },
        {
          value: 3,
          label: "Divorciado (a)",
        },
        {
          value: 4,
          label: "Viúvo (a)",
        },
      ],
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        width: "75%",
      },
      videoData: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      loadingUpload: false,
      isLoadingCostumerTemplate: false,
      inputChangedTimes: 0,
      currencyOptions: [
        {
          label: "DÓLAR",
          value: "USD",
        },
        {
          label: "EURO",
          value: "EUR",
        },
      ],
      clientForm: {
        canChangeInput: false,
        inputChangedTimes: 0,
        currency: "",
        currencyTax: "",
        importer: "",
        billing: "",
        date: "",
        modal: "",
        cargoType: "",
        purchaser: "",
        fob: "",
        shipping: "",
        product: "",
        cntr: "",
        origin: "",
        destination: "",
        icmsDestination: "",
        ncm: "",
      },
      customerTemplates: [],
      selectedCustomerTemplate: "",
    };
  },
  computed: {
    ...mapGetters([
      "getImagesCarTemplate",
      "getClientDataFromCache",
      "getCurrency",
    ]),
  },
  mounted() {
    this.initCostumerData();
  },
  watch: {
    editorData() {
      this.clientForm.contractTemplate = this.editorData;
      this.inputChanged(true);
    },
  },
  methods: {
    ...mapMutations([
      "SET_IMAGES_CAR_TEMPLATE",
      "SET_DESCRIPTION_DATA",
      "SET_VIDEO_DATA",
      "REMOVE_IMAGES_CAR_TEMPLATE",
    ]),
    ...mapActions([
      "updateFormTreeData",
      "updateCurrencyData",
      "updateBrowserCache",
    ]),
    async initCostumerData() {
      this.handleCanChangeInput();

      if (
        localStorage.getItem("clientData") &&
        Object.keys(JSON.parse(localStorage.getItem("clientData"))).includes(
          "contractTemplate"
        )
      ) {
        this.editorData = JSON.parse(
          localStorage.getItem("clientData")
        ).contractTemplate;
      } else {
        this.editorData = ModeloContrato;
      }

      if (this.customerTemplates.length == 0) {
        this.getCostumerTemplates();
      }
    },
    handleCanChangeInput() {
      setTimeout(() => {
        this.canChangeInput = true;
        if (this.getClientDataFromCache) {
          this.clientForm = this.getClientDataFromCache;
          this.selectedCustomerTemplate = this.getClientDataFromCache.id;
        }
      }, 500);
    },
    inputChanged(forceUpdate) {
      if ((this.inputChangedTimes >= 1 && this.canChangeInput) || forceUpdate) {
        const dataToUpdate = {
          ...this.clientForm,
          id: this.selectedCustomerTemplate,
        };
        this.updateFormTreeData({
          data: dataToUpdate,
          stepName: "clientData",
        });
      }
      this.inputChangedTimes += 1;
    },
    onClearTemplate() {
      this.resetCostumerFormFields();
      this.editorData = "";
    },
    onChangeTemplate(selectedCostumerId) {
      const costumer = this.customerTemplates.find(
        (c) => c.id === selectedCostumerId
      );

      if (!costumer) {
        return;
      }

      this.clientForm.name = costumer.name;
      this.clientForm.cpf = costumer.cpf;
      this.clientForm.rg = costumer.rg;
      this.clientForm.civilState = costumer.civilState;
      this.clientForm.occupation = costumer.occupation;
      this.clientForm.address = costumer.address;
      this.clientForm.complement = costumer.complement;

      if (costumer.contractTemplate) {
        this.editorData = costumer.contractTemplate;
      }

      this.inputChanged(true);
    },
    async getCostumerTemplates() {
      this.isLoadingCostumerTemplate = true;

      try {
        this.customerTemplates = await new CostumerService().getAll();
      } catch (error) {
        console.error(error);
        this.$notify({
          title: "Erro",
          message: "Ocorreu um erro ao buscar templates dos clientes",
          type: "error",
        });
      } finally {
        this.isLoadingCostumerTemplate = false;
      }
    },
    resetCostumerFormFields() {
      this.clientForm.name = "";
      this.clientForm.cpf = "";
      this.clientForm.rg = "";
      this.clientForm.civilState = "";
      this.clientForm.occupation = "";
      this.clientForm.address = "";
      this.clientForm.complement = "";

      this.editorData = ModeloContrato;
    },
    async saveCostumer() {
      this.isLoadingCostumerTemplate = true;

      try {
        const costumer = new Costumer();

        if (this.selectedCustomerTemplate) {
          costumer.id = this.selectedCustomerTemplate;
        }

        costumer.name = this.clientForm.name;
        costumer.cpf = this.clientForm.cpf;
        costumer.rg = this.clientForm.rg;
        costumer.civilState = this.clientForm.civilState;
        costumer.occupation = this.clientForm.occupation;
        costumer.address = this.clientForm.address;
        costumer.complement = this.clientForm.complement;

        if (this.editorData !== ModeloContrato) {
          costumer.contractTemplate = this.editorData;
        }

        await new CostumerService().save(costumer);

        this.$notify({
          title: "Sucesso",
          message: "Cliente salvo com sucesso",
          type: "success",
        });
      } catch (error) {
        console.error(error);
        this.$notify({
          title: "Erro",
          message: "Ocorreu um erro ao tentar salvar o cliente",
          type: "error",
        });
      } finally {
        this.isLoadingCostumerTemplate = false;
      }
    },
    async deleteCostumer() {
      this.isLoadingCostumerTemplate = true;

      try {
        if (!this.selectedCustomerTemplate) {
          return;
        }
        await new CostumerService().delete(this.selectedCustomerTemplate);
        this.selectedCustomerTemplate = "";

        await this.getCostumerTemplates();
        this.resetCostumerFormFields();

        this.$notify({
          title: "Sucesso",
          message: "Cliente deletado com sucesso",
          type: "success",
        });
      } catch (error) {
        console.error(error);
        this.$notify({
          title: "Erro",
          message: "Ocorreu um erro ao deletar o cliente",
          type: "error",
        });
      } finally {
        this.isLoadingCostumerTemplate = false;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.el-upload-list--picture-card {
  display: none;
}
.el-upload--picture-card {
  display: block;
  min-width: 300px;
  width: 100% !important;
  margin-bottom: 15px;
}
.el-upload-list .el-upload-list--picture-card {
  display: none !important;
}
.icon {
  z-index: 5;
  display: none;
  cursor: pointer;
  position: absolute !important;
  top: -12px;
  right: -12px;
  color: white;
  background-color: orangered;
  border-radius: 50%;
  padding: 2px 2px;
}
.display-img {
  flex-wrap: wrap;
  margin-top: 8px;
  margin-left: 10px;
  span {
    position: relative;
    cursor: pointer;
    img {
      transition: 0.3s;
      display: block;
      max-width: 230px;
      max-height: 135px;
      width: auto;
      height: auto;
      border-radius: 4px;
      margin-left: 15px;
    }
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      display: none;
    }
    &:first-child {
      img {
        margin-left: 0;
      }
    }
    &:hover {
      img {
        opacity: 0.3;
      }
      i {
        display: block;
      }
      .icon {
        display: block;
      }
    }
  }
}
.el-upload-list--picture-card .el-upload-list__item {
  height: unset !important;
}
@media screen and (max-width: 768px) {
  .ck.ck-editor {
    max-width: 300px;
  }
}

.vehicle-template-actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.select-template-content {
  // padding: 25px 0;
  // background-color: #1A1A1A;

  .description {
    display: block;
    max-width: 300px;
  }
}
</style>
