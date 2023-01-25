<template>
  <div>
    <el-form
      label-position="top"
      label-width="120px"
      :inline="true"
      class="demo-vehicleForm"
    >
      <el-form-item label="Galeria de mídia">
        <el-upload
          action="#"
          multiple
          :limit="5"
          :on-change="fileInput"
          v-loading="loadingUpload"
          list-type="picture-card"
          :auto-upload="false"
          :on-exceed="handleExceed"
        >
          <i slot="default">
            <i class="el-icon-upload2"></i>
          </i>
          <div slot="file" slot-scope="{ file }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item class="w-100" label="Url Video">
        <input
          style="width: 50%"
          class="el-input__inner w-100"
          @keydown="updateVideoData($event)"
          v-model="videoData"
          placeholder="https://youtube/mmdsKJdsn"
        />
      </el-form-item>
      <el-form-item label="Descrição Veículo">
        <ckeditor
          :editor="editor"
          v-model="editorData"
          :config="editorConfig"
        ></ckeditor>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <el-form
      :model="vehicleForm"
      label-position="top"
      ref="vehicleForm"
      label-width="120px"
      :inline="true"
      class="demo-vehicleForm"
    >
      <el-form-item label="Moeda" prop="currency">
        <el-select
          @change="updateLocalCurrencyData()"
          v-model="vehicleForm.currency"
          placeholder="Selecione"
        >
          <el-option
            v-for="(item, i) in currencyOptions"
            :key="i"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Modificador" prop="modifier">
        <input
          class="el-input__inner"
          v-money="money"
          @keydown="handleModifierChange($event)"
          placeholder="Insira"
          v-model="vehicleForm.modifier"
        />
      </el-form-item>
      <el-form-item label="Taxa Fiscal" prop="currencyTax">
        <input
          class="el-input__inner"
          v-money="money"
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="vehicleForm.currencyTax"
        />
      </el-form-item>
    </el-form>
    <el-form
      :model="vehicleForm"
      label-position="top"
      ref="vehicleForm"
      label-width="120px"
      :inline="true"
      class="demo-vehicleForm"
    >
      <el-form-item label="Importador" prop="importer">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="vehicleForm.importer"
        ></el-input>
      </el-form-item>
      <el-form-item label="Faturamento" prop="billing">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="vehicleForm.billing"
        ></el-input>
      </el-form-item>
      <el-form-item label="Data" prop="date">
        <el-date-picker
          format="dd/MM/yyyy"
          v-model="vehicleForm.date"
          type="date"
          @input="inputChanged($event)"
          placeholder="Selecione uma data"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Modal" prop="modal">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="vehicleForm.modal"
        ></el-input>
      </el-form-item>
      <el-form-item label="Tipo de Carga" prop="cargoType">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="vehicleForm.cargoType"
        ></el-input>
      </el-form-item>
      <el-form-item label="Adquirente" prop="purchaser">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="vehicleForm.purchaser"
        ></el-input>
      </el-form-item>
      <el-form-item label="FOB" prop="fob">
        <input
          class="el-input__inner"
          v-money="getCurrency.moneyConfig"
          @blur="inputChanged($event)"
          placeholder="Insira"
          v-model="vehicleForm.fob"
        />
      </el-form-item>
      <el-form-item label="Frete" prop="shipping">
        <input
          class="el-input__inner"
          v-money="getCurrency.moneyConfig"
          @blur="inputChanged($event)"
          placeholder="Insira"
          v-model="vehicleForm.shipping"
        />
      </el-form-item>
      <el-form-item label="Produto" prop="product">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="vehicleForm.product"
        ></el-input>
      </el-form-item>
      <el-form-item label="Qtde. CNTR" prop="cntr">
        <el-input
          type="number"
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="vehicleForm.cntr"
        ></el-input>
      </el-form-item>
      <el-form-item label="Origem" prop="origin">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="vehicleForm.origin"
        ></el-input>
      </el-form-item>
      <el-form-item label="Destino" prop="destination">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="vehicleForm.destination"
        ></el-input>
      </el-form-item>
      <el-form-item label="ICMS Destino" prop="icmsDestination">
        <el-input
          @input="inputChanged($event)"
          v-mask="['#%', '##%', '###%']"
          placeholder="Insira"
          v-model="vehicleForm.icmsDestination"
        ></el-input>
      </el-form-item>
      <el-form-item label="NCM" prop="ncm">
        <el-input
          type="number"
          @input="inputChanged($event)"
          placeholder="Insira"
          v-model="vehicleForm.ncm"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import StringToDouble from "@/utils/common/StringToDouble";
import commonFormMixin from "@/utils/mixins/commonFormMixin";

export default {
  name: "VehicleData",
  mixins: [commonFormMixin],
  data() {
    return {
      editor: ClassicEditor,
      editorData:
        "<p>Tesla Model 3 Performance, 2023/2023, com full auto-pilot, interior alpine white e preto, com 5 bancos, carregador rápido extra e também uma capa personalizada para ser usada em ambientes fechados.&nbsp;</p><ul><li>Motor V8 4.0 Biturbo + 3 Motores Elétricos&nbsp;</li><li>1.000 cv de Potência Combinada&nbsp;</li><li>81,5 Kgfm de Torque&nbsp;</li><li>Câmbio Automatizado de Dupla Embreagem de 8 Velocidades&nbsp;</li><li>Tração Integral&nbsp;</li><li>Aceleração de 0 a 100 km/k em 2,5 s&nbsp;</li><li>Aceleração de 0 a 200 km/h em 6,7 s&nbsp;</li><li>Velocidade Máxima de 340 km/h</li></ul>",
      editorConfig: {
        'width': '75%',
      },
      videoData: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      loadingUpload: false,
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
      vehicleForm: {
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
    };
  },
  mounted() {
    this.handleCanChangeInput();
  },
  computed: {
    ...mapGetters(["getVehicleDataFromCache", "getCurrency"]),
  },
  watch: {
    editorData(newValue) {
      this.SET_DESCRIPTION_DATA(newValue);
    },
  },
  methods: {
    ...mapMutations([
      "SET_IMAGES_CAR_TEMPLATE",
      "SET_DESCRIPTION_DATA",
      "SET_VIDEO_DATA",
    ]),
    ...mapActions(["updateFormTreeData", "updateCurrencyData"]),
    youtubeParser(url) {
      var regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      var match = url.match(regExp);
      return match && match[7].length == 11 ? match[7] : false;
    },
    updateVideoData() {
      setInterval(() => {
        const videoId = this.youtubeParser(this.videoData);
        this.toDataUrl(
          `http://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        ).then((resp) => {
          this.SET_VIDEO_DATA({
            url: this.videoData,
            thumbBase64: resp,
          });
        });
      }, 1500);
    },
    handleExceed() {
      this.$notify({
        title: "Limite de imagens atingido!",
        message: "Favor recarregar a página e tentar novamente.",
        type: "warning",
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async toDataUrl(url) {
      //Convert to base64
      return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
          var reader = new FileReader();
          reader.onloadend = function () {
            resolve(reader.result);
          };
          reader.readAsDataURL(xhr.response);
        };
        xhr.onerror = () => {
          reject({
            status: this.status,
            statusText: xhr.statusText,
          });
        };
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.send();
      });
    },
    async fileInput(file) {
      try {
        if (file && file.name) {
          this.processing = true;
          var url = file.url;
          const imgData = new FormData();
          imgData.append("image", file);
          const metadata = { contentType: file.type };
          const that = this;
          that.loadingUpload = true;
          fetch(url)
            .then((res) => res.blob())
            .then((blob) => {
              that.toDataUrl(url).then((resp) => {
                that.SET_IMAGES_CAR_TEMPLATE(resp);
              });
              console.log(blob, metadata, url);
              that.loadingUpload = false;
            });
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.processing = false;
      }
    },
    handleModifierChange() {
      setTimeout(() => {
        if (
          Object.keys(this.getCurrency).length > 0 &&
          this.vehicleForm.currency
        ) {
          const currencyTaxResult = Object.keys(this.getCurrency).filter(
            (value) => value.includes(this.vehicleForm.currency)
          );

          const total = parseFloat(
            this.getCurrency[currencyTaxResult].ask
          ).toFixed(2);

          this.vehicleForm.currencyTax = (
            parseFloat(total) +
            parseFloat(StringToDouble(this.vehicleForm.modifier))
          ).toFixed(2);

          this.inputChanged();
        }
      }, 500);
    },
    handleCanChangeInput() {
      setTimeout(() => {
        this.canChangeInput = true;
        if (this.getVehicleDataFromCache) {
          this.vehicleForm = this.getVehicleDataFromCache;
        }
      }, 500);
    },
    updateLocalCurrencyData() {
      if (Object.keys(this.getCurrency).length > 0) {
        this.handleModifierChange();

        this.updateCurrentCurrencyOption();
      }
    },
    updateCurrentCurrencyOption() {
      // Updating to all application the money config
      const moneyConfigOptions = {
        EUR: {
          decimal: ",",
          thousands: ".",
          prefix: "€ ",
          precision: 2,
          masked: false /* doesn't work with directive */,
        },
        USD: {
          decimal: ",",
          thousands: ".",
          prefix: "$ ",
          precision: 2,
          masked: false /* doesn't work with directive */,
        },
      };

      this.updateCurrencyData({
        ...this.getCurrency,
        moneyConfig: moneyConfigOptions[this.vehicleForm.currency],
      });
    },
    inputChanged() {
      if (this.inputChangedTimes >= 1 && this.canChangeInput) {
        const dataToUpdate = { ...this.vehicleForm };
        this.updateFormTreeData({
          data: dataToUpdate,
          stepName: "vehicleData",
        });
      }
      this.inputChangedTimes += 1;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.el-upload-list--picture-card .el-upload-list__item {
  height: unset !important;
}
@media screen and (max-width: 768px){
  .ck.ck-editor {
    max-width: 300px;
  }
}
</style>
