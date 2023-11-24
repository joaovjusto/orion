<template>
  <div>
    <el-form
      :model="vehicleForm"
      label-position="top"
      ref="vehicleForm"
      label-width="120px"
      :inline="true"
      class="demo-vehicleForm"
    >
    <el-form-item label="Veículo" prop="product">
        <el-input
          @input="inputChanged($event)"
          placeholder="Insira o nome"
          v-model="vehicleForm.product"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-form
      label-position="top"
      label-width="120px"
      :inline="true"
      class="demo-vehicleForm"
    >
      <el-form-item label="Galeria de mídia">
        <div v-if="getImagesCarTemplate">
          <el-upload
            v-if="getImagesCarTemplate.length === 0"
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
          <div class="d-flex display-img" v-else>
            <span
              v-for="(img, index) in getImagesCarTemplate"
              @click="handlePictureCardPreview({ url: img })"
              :key="index"
            >
              <img :src="img" alt="" />
              <i class="el-icon-zoom-in"></i>
            </span>
          </div>
        </div>
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
        width: "75%",
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
    ...mapGetters([
      "getImagesCarTemplate",
      "getVehicleDataFromCache",
      "getCurrency",
    ]),
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
    ...mapActions([
      "updateFormTreeData",
      "updateCurrencyData",
      "updateBrowserCache",
    ]),
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
        url += "?key=AIzaSyDti7Y_KJsxb7iEqPPLqRwZPNmf_7gjNKQ"
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
          // eslint-disable-next-line no-unused-vars
          const metadata = { contentType: file.type };
          const that = this;
          that.loadingUpload = true;
          fetch(url)
            .then((res) => res.blob())
            // eslint-disable-next-line no-unused-vars
            .then((blob) => {
              that.toDataUrl(url).then((resp) => {
                that.SET_IMAGES_CAR_TEMPLATE(resp);
                localStorage.setItem("carImages", JSON.stringify({images: that.getImagesCarTemplate}));
              });
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
.display-img {
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
</style>
