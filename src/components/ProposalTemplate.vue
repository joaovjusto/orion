<template>
  <div id="proposal">
    <el-button type="primary" @click="makeProposal">Download Proposta</el-button>
  </div>
</template>
<script>
import html2pdf from "html2pdf.js";

export default {
  methods: {
    makeProposal() {
      let element = document.getElementById("app");
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
        jsPDF: { format: [600, 2000], unit: "px" },
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
