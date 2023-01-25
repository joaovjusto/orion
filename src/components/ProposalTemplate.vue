<template>
  <div id="proposal" class="page2el">
    <div id="proposal-template" style="width: 850px; margin: 0 auto">
      <div class="first-section text-center">
        <img
          width="750"
          style="margin-top: 500px; margin-bottom: 500px"
          src="../assets/logo-proposal.png"
          alt=""
        />
        <div>
          <img src="../assets/scroll-to-bottom.png" alt="" />
        </div>
      </div>
      <div style="margin-top: 300px" class="second-section pdf p-5">
        <strong class="xl">NOSSA ESSÊNCIA</strong>
        <p class="mb-5">
          Um pouco sobre quem está por trás dos bastidores da Vision Imports.
        </p>
        <strong>Nossa Missão de Vida</strong>
        <p class="mb-4 min">
          Não nos basta importar carros apenas pelo fato óbvio da relação
          comercial, somos acima de tudo, apaixonados por estas máquinas que
          despertam desejos em todos, vibramos a cada importação de um carro
          exótico que vai passar a rodar nas estradas do nosso país.
        </p>
        <div class="position-absolute" style="width: 775px">
          <strong>Nossa Meta</strong>
          <p class="mb-4 min">
            Trazer essas máquinas para o nosso país já é uma realização por si
            só, porém temos como meta de equipe fazer a diferença no mercado de
            carros esportivos e exóticos do Brasil.
          </p>
          <strong>Porque a Gente?</strong>
          <p class="min">
            Além de especialistas em importação de automóveis, somos petrolheads
            convictos, o desejo por carros fizeram parte das nossas infâncias,
            das nossas conquistas diárias e também da construção dos nossos
            sonhos.
          </p>
        </div>
      </div>
      <img
        style="margin-top: 100px; width: 848px"
        src="../assets/SILVERADO-BG.png"
        alt=""
      />
      <div class="p-5 pdf">
        <h1 class="xl mt-3">SUA COTAÇÃO</h1>
        <p class="mb-4">
          Valor estimado da sua operação de acordo com a cotação do dia.
        </p>
        <div class="d-flex justify-content-between">
          <div class="text-center">
            <span
              class="value-displayer"
              style="display: block; font-weight: 550"
              >R$ 12.345.678,90</span
            >
            <h6>VALOR ESTIMADO / ENTREGUE NO BRASIL</h6>
          </div>
          <div class="text-center">
            <span
              class="value-displayer"
              style="display: block; font-weight: 550"
              >R$ 5,283</span
            >
            <h6>US$ DÓLAR</h6>
          </div>
        </div>
      </div>
      <div class="mb-3 pdf">
        <img
          style="
            display: block;
            max-width: 740px;
            max-height: 440px;
            width: auto;
            height: auto;
            margin: 0 auto;
          "
          :src="getImagesCarTemplate[0]"
          alt=""
        />
      </div>
      <div class="mt-5 text-center pdf">
        <p style="font-size: 16px">Descrição do Veículo</p>
      </div>

      <div class="background-grey-container" v-html="getDescriptionData"></div>
      <div class="p-5 pdf">
        <h1 class="xl mt-3">GALERIA DE MÍDIAS</h1>
        <p class="mb-4">
          Confira imagens do veículo que iremos importar para você.
        </p>
      </div>

      <div
        id="images-custom"
        class="d-flex flex-wrap justify-content-center mb-3"
      >
        <div v-for="(img, i) in getImagesCarTemplate" :key="i">
          <img v-if="i > 0" :src="img" width="500" alt="" />
        </div>
      </div>
      <a :href="getVideoData.url">
        <div class="text-center mb-5">
          <img
            style="
              opacity: 0.7;
              left: 50%;
              margin-left: -150px;
              position: absolute;
            "
            width="300px"
            src="../assets/next_hires.png"
            alt=""
          />
          <img :src="getVideoData.thumbBase64" width="600" alt="" />
        </div>
      </a>

      <div class="social-media text-center">
        <a href="http://youtube.com">
          <img
            src="../assets/youtube.png"
            style="margin-right: 20px"
            width="100"
            alt=""
          />
        </a>
        <a href="http://instagram.com">
          <img
            src="../assets/instagram.png"
            style="margin-right: 20px"
            width="100"
            alt=""
          />
        </a>
        <a href="http://whatsapp.com">
          <img
            src="../assets/whatsapp.png"
            style="margin-right: 20px"
            width="100"
            alt=""
          />
        </a>
        <a href="http://wordpress.com">
          <img
            src="../assets/wordpress.png"
            style="margin-right: 20px"
            width="100"
            alt=""
          />
        </a>
        <p class="mb-4 d-block mt-4">Link Úteis</p>
      </div>

      <!-- Footer -->
      <div class="footer mt-5">
        <img src="../assets/logo-white.png" width="200" alt="" />
      </div>
    </div>
    <div class="text-center">
      <el-button class="mt-5" type="primary" @click="makeProposal"
        >Download Proposta</el-button
      >
    </div>
  </div>
</template>
<script>
import html2pdf from "html2pdf.js";
import { mapActions, mapGetters } from "vuex";

import FileSaver from "file-saver";

export default {
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
    ]),
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
        message: "Gerando Proposta, por favor aguarde...",
        type: "warning",
      });
      let that = this;

      const elm = document.getElementById("proposal-template");
      const width = elm.offsetWidth;
      const height = elm.offsetHeight;

      let opt = {
        pagebreak: {
          before: ".beforeClass",
          after: ["#after1", "#after2"],
          avoid: "img",
        },
        enableLinks: true,
        margin: 1,
        image: { type: "jpeg", quality: 1 },
        filename: "Proposta.pdf",
        html2canvas: {
          dpi: 100,
          scale: 2,
          letterRendering: true,
          useCORS: true,
        },
        jsPDF: { unit: "px", format: [width, height + 40] },
      };

      html2pdf()
        .set(opt)
        .from(elm)
        .outputPdf()
        .then(function (pdf) {
          var contentType = "application/pdf";
          const blob = that.b64toBlob(btoa(pdf), contentType);

          that.setLoadingState(false);
          that.$notify({
            title: "Sucesso",
            message: "Proposta gerada com sucesso",
            type: "success",
          });

          setTimeout(() => {
            FileSaver.saveAs(blob, "Proposta.PDF");
          }, 1500);
        })
        .toPdf();
    },
  },
};
</script>

<style scoped>
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
  font-family: "Acumin letiable Concept", sans-serif;
  letter-spacing: -1px;
  color: #7b7b7b;
}

h1 {
  color: #7b7b7b;
  margin: 0;
  font-size: 50px;
}

strong.xl {
  font-size: 50px;
}

strong {
  font-size: 30px;
}

p.min {
  font-size: 26px;
}

p {
  margin: 0;
  font-size: 22px;
}
.value-displayer {
  color: #7b7b7b;
  padding: 0 15px;
  font-size: 50px;
  height: 75px;
  border: 0.5px solid #f3f3f3;
  border-radius: 10px;
  background-image: url(../assets/valor-bg.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto;
}
</style>
