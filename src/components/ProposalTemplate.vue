<template>
  <div id="proposal">
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
            <subtitle>VALOR ESTIMADO / ENTREGUE NO BRASIL</subtitle>
          </div>
          <div class="text-center">
            <span
              class="value-displayer"
              style="display: block; font-weight: 600"
              >R$ 5,283</span
            >
            <subtitle>US$ DÓLAR</subtitle>
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

export default {
  methods: {
    makeProposal() {
      let element = document.getElementById("proposal-template");
      console.log("proposal", element);

      var opt = {
        enableLinks: true,
        pagebreak: {
          before: ".beforeClass",
          after: ["#after1", "#after2"],
          avoid: "img",
        },
        // margin: 1,
        filename: "Proposta.pdf",
        image: { type: "jpeg", quality: 1 },
        // html2canvas: { scale: 2 },
        jsPDF: { format: [850, 3800], unit: "px" },
      };

      // New Promise-based usage:
      html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
          console.log("terminei");
        });

      // // Old monolithic-style usage:
      // html2pdf(element, opt);
    },
  },
};
</script>

<style scoped>
.pdf {
  font-family: "Acumin Variable Concept", sans-serif;
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
  border: .5px solid #f3f3f3;
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
