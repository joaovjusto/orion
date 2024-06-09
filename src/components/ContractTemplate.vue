<template>
  <div class="pdf">
    <div id="proposal">
      <div v-html="getClientDataFromCache.contractTemplate"></div>
    </div>
    <div class="text-center">
      <el-button class="mt-5" type="primary" @click="makeProposal">Download
        Contrato</el-button>
    </div>
  </div>
</template>
<script>
import html2pdf from "html2pdf.js";
import { mapActions, mapGetters } from "vuex";
import { v4 as uuidv4 } from "uuid";

// import ModeloContrato from './Forms/data/modelo_contrato.js';

import { DocumentService } from "@/services";

import FileSaver from "file-saver";

export default {
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      loadingUpload: false,
      pdf: "",
    };
  },
  computed: {
    ...mapGetters([
      "getImagesCarTemplate",
      "getDescriptionData",
      "getVideoData",
      "getVehicleDataFromCache",
      "getProposal",
      "getClientDataFromCache",
    ]),
    getCurrencyText() {
      switch (this.getVehicleDataFromCache.currency) {
        case "USD":
          return "Dólar";
        case "EUR":
          return "Euro";
        default:
          return "";
      }
    },
  },
  methods: {
    ...mapActions(["setLoadingState"]),
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
    b64toBlob(b64Data, contentType = "", sliceSize = 512) {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];

      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type: contentType });
      return blob;
    },
    async makeProposal() {
      this.setLoadingState(true);
      this.$notify({
        title: "Atenção",
        message: "Gerando Contrato, por favor aguarde...",
        type: "warning",
      });
      let that = this;

      const id = uuidv4();
      // if (this.getClientDataFromCache && this.getClientDataFromCache.contractTemplate) {
        //Adicionar o ID da proposta no PDF
        // document.getElementById("proposal").innerHTML = `Contrato: ${id}`;
      // }

      const elm = document.getElementById("proposal");
      const date = that.$options.filters.formatDate(new Date().toISOString());

      const fileName = `Contrato ${that.getVehicleDataFromCache.product} em ${date}`;
      let opt = {
        enableLinks: true,
        margin: 1,
        image: { type: "jpeg", quality: 1 },
        filename: fileName,
        html2canvas: {
          dpi: 100,
          scale: 2,
          letterRendering: true,
          useCORS: true,
        },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      html2pdf()
        .set(opt)
        .from(elm)
        .outputPdf()
        .then(async function (pdf) {
          var contentType = "application/pdf";
          const blob = that.b64toBlob(btoa(pdf), contentType);

          that.setLoadingState(false);
          that.$notify({
            title: "Sucesso",
            message: "Contrato gerada com sucesso",
            type: "success",
          });

          that.savePdf(id, blob, fileName);

          setTimeout(() => {
            const date = that.$options.filters.formatDate(
              new Date().toISOString()
            );
            FileSaver.saveAs(
              blob,
              `Contrato ${that.getVehicleDataFromCache.product} em ${date}`
            );
          }, 1500);
        })
        .toPdf();
    },
    async savePdf(id, buffer, fileName) {
      if (this.getProposal && this.getProposal.id) {
        new DocumentService().save(id, buffer, this.getProposal.id, fileName);
      }
    },
  },
};
</script>

<style>
.el-dialog__body{
  word-break: break-word !important;
}
</style>

<style lang="scss" scoped>
body {
  line-height: 108%;
  font-family: Calibri;
  font-size: 11pt;
}
p {
  margin: 0pt 0pt 8pt;
}
.Footer {
  margin-bottom: 0pt;
  line-height: normal;
  font-size: 11pt;
}
.Header {
  margin-bottom: 0pt;
  line-height: normal;
  font-size: 11pt;
}

.first-section {
  img {
    max-height: 50px;
  }
}

.footer {
  text-align: center;
  background-color: #7b7b7b;
  padding: 25px;
}
.background-grey-container {
  background-color: #f1f1f1;
  padding: 20px;
  margin: 30px;
}
#images-custom img {
  display: block;
  max-width: 420px;
  max-height: 230px;
  width: auto;
  height: auto;
  margin-right: 15px;
  margin-top: 15px;
}
.pdf {
  // text-wrap: wrap;
  border: 1px solid black;
  padding: 15px;
  margin: 0px auto;
  max-width: 700px;
  color: black;
  font-family: "Calibri", sans-serif !important;
  letter-spacing: 0px;
}

h1 {
  color: #7b7b7b;
  margin: 0;
  font-size: 50px;
}

strong.xl {
  font-size: 20px;
}

strong {
  font-size: 14px;
}

/* p.min {
  font-size: 26px;
} */

p {
  margin: 0;
  font-size: 12px;
}
</style>
