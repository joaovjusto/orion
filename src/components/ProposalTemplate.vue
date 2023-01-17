<template>
  <div id="proposal" class="page2el">
    <div
      id="proposal-template"
      style="
        width: 850px;
        height: 3800px;
        margin: 0 auto;
        border: 1px solid black;
      "
    >
      <div class="first-section text-center">
        <img
          width="750"
          style="margin-top: 500px; margin-bottom: 500px"
          src="../assets/logo-proposal.png"
          alt=""
        />
        <div>
          <img
            width="120"
            style="
              -webkit-transform: rotate(270deg);
              -moz-transform: rotate(270deg);
              -ms-transform: rotate(270deg);
              -o-transform: rotate(270deg);
              transform: rotate(270deg);
            "
            src="../assets/scroll-to-bottom.png"
            alt=""
          />
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
      <div class="p-5">
        <h1 class="xl mt-3">SUA COTAÇÃO</h1>
        <p class="mb-4">
          Valor estimado da sua operação de acordo com a cotação do dia.
        </p>
        <div class="d-flex justify-content-between">
          <div class="text-center">
            <span
              class="value-displayer"
              style="display: block; font-weight: 600"
              >R$ 12.345.678,90</span
            >
            <h6>VALOR ESTIMADO / ENTREGUE NO BRASIL</h6>
          </div>
          <div class="text-center">
            <span
              class="value-displayer"
              style="display: block; font-weight: 600"
              >R$ 5,283</span
            >
            <h6>US$ DÓLAR</h6>
          </div>
        </div>
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
import jQuery from "jquery";
import { mapActions } from "vuex";

import FileSaver from "file-saver";

export default {
  data() {
    return {
      pdf: " ",
    };
  },
  methods: {
    ...mapActions(["setLoadingState"]),
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
    makeProposal() {
      // let element = document.getElementById("proposal-template");
      // console.log("proposal", element);

      // let opt = {
      //   enableLinks: true,
      //   pagebreak: {
      //     before: ".beforeClass",
      //     after: ["#after1", "#after2"],
      //     avoid: "img",
      //   },
      //   // margin: 1,
      //   filename: "Proposta.pdf",
      //   image: { type: "jpeg", quality: 1 },
      //   // html2canvas: { scale: 2 },
      //   jsPDF: { format: [850, 3800], unit: "px" },
      // };

      // // New Promise-based usage:
      // html2pdf()
      //   .set(opt)
      //   .from(element)
      //   .save()
      //   .then(() => {
      //     console.log("terminei");
      //   });
      this.setLoadingState(true);
      this.$notify({
        title: "Atenção",
        message: "Gerando Proposta, por favor aguarde...",
        type: "warning",
      });
      let that = this;

      let opt = {
        margin: 1,
        pagebreak: { mode: "css", after: ".page2el" },
        image: { type: "jpeg", quality: 1 },
        filename: "Proposta.pdf",
        html2canvas: { dpi: 100, scale: 2, letterRendering: true },
        jsPDF: { unit: "pt", format: "letter", orientation: "p" },
      };

      let count = 1;
      let doc = html2pdf()
        .set(opt)
        .from(document.getElementById("proposal-template"))
        .outputPdf()
        .then(function (pdf) {
          var contentType = "application/pdf";
          const blob = that.b64toBlob(btoa(pdf), contentType);

          FileSaver.saveAs(blob, "Proposta.PDF");
        })
        .toPdf();
      jQuery("#cs_pdf")
        .find("div")
        .each(function () {
          // Filtering document each page with starting id with page2el
          if (
            jQuery(this).attr("id") &&
            jQuery(this).attr("id").indexOf("page2el") != -1
          ) {
            if (count != 1) {
              doc = doc
                .get("pdf")
                .then((pdf) => {
                  pdf.addPage();
                  let totalPages =
                    jQuery("#cs_pdf").find(".page2el").length + 1;

                  // Adding footer text and page number for each PDF page
                  for (let i = 1; i <= totalPages; i++) {
                    pdf.setPage(i);
                    pdf.setFontSize(10);
                    pdf.setTextColor(60);
                    if (i !== 1) {
                      pdf.text(
                        "Page " + i + " of " + totalPages,
                        pdf.internal.pageSize.getWidth() - 100,
                        pdf.internal.pageSize.getHeight() - 25
                      );
                    }
                    if (i === 1) {
                      pdf.text(
                        "Confidential",
                        pdf.internal.pageSize.getWidth() - 340,
                        pdf.internal.pageSize.getHeight() - 35
                      );
                    } else {
                      pdf.text(
                        // consultant_company,
                        pdf.internal.pageSize.getWidth() - 530,
                        pdf.internal.pageSize.getHeight() - 25
                      );
                    }
                  }
                })
                .from(document.getElementById(jQuery(this).attr("id")))
                .toContainer()
                .toCanvas()
                .toPdf();
            }
            count++;
          }
          // On Jquery each loop completion executing save function on doc object to compile and download PDF file
        })
        .promise();
      // .done(function () {
      //   doc.save();
      // });
    },
  },
};
</script>

<style scoped>
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
  font-size: 24px;
}
.value-displayer {
  color: #7b7b7b;
  padding: 0 15px;
  font-size: 50px;
  height: 75px;
  border: 0.5px solid #f3f3f3;
  border-radius: 10px;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgb(207, 207, 207) 85%,
    rgb(156, 156, 156) 100%
  );
}
</style>
