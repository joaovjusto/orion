<template>
  <div>
    <el-form label-position="top" label-width="120px" :inline="true">
      <el-form-item label="Selecione de um template" prop="template">
        <el-select v-model="selectedVehicleTemplate" placeholder="Selecione">
          <el-option
            v-for="template in vehicleTemplates"
            :key="template.id"
            :label="template.model"
            :value="template.id"
          >
            <div class="select-template-content">
              <span>{{ template.model }} </span>
              <span
                class="description"
                style="color: #8492a6; font-size: 13px"
                v-html="parseHtml(template.description.substring(0, 180))"
              ></span>
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
      <el-form-item label="Profissão" prop="ocupation">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira a ocupação"
          v-model="clientForm.ocupation"
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
        <el-button :loading="isLoadingVehicleTemplate">
          Salvar como template
        </el-button>
      </el-tooltip>
      <el-button
        v-if="selectedVehicleTemplate != ''"
        type="danger"
        icon="el-icon-delete"
        circle
        :loading="isLoadingVehicleTemplate"
      ></el-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import commonFormMixin from "@/utils/mixins/commonFormMixin";

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
      editorData: ModeloContrato,
      editorConfig: {
        width: "75%",
      },
      videoData: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      loadingUpload: false,
      isLoadingVehicleTemplate: false,
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
      vehicleTemplates: [],
      selectedVehicleTemplate: "",
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
    this.handleCanChangeInput();
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
    handleCanChangeInput() {
      setTimeout(() => {
        this.canChangeInput = true;
        if (this.getClientDataFromCache) {
          this.clientForm = this.getClientDataFromCache;
        }
      }, 500);
    },
    inputChanged() {
      if (this.inputChangedTimes >= 1 && this.canChangeInput) {
        const dataToUpdate = { ...this.clientForm };
        this.updateFormTreeData({
          data: dataToUpdate,
          stepName: "clientData",
        });
      }
      this.inputChangedTimes += 1;
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
