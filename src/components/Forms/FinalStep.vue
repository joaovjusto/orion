<template>
  <div>
    <el-form
      :model="creditForm"
      label-position="top"
      ref="creditForm"
      label-width="120px"
      :inline="true"
      class="demo-creditForm"
    >
      <el-form-item label="Base de calculo faturamento" prop="invoiceValue">
        <el-input
          placeholder="Insira"
          readonly
          v-model="creditForm.invoiceValue"
        ></el-input>
      </el-form-item>
    </el-form>

    <el-form label-position="top" :inline="true">
      <el-form-item label="ICMS" prop="icms">
        <el-input placeholder="Insira" v-model="creditForm.icms"></el-input>
      </el-form-item>
      <el-form-item label="Valor" prop="valueIcms">
        <el-input
          placeholder="Insira"
          v-model="creditForm.valueIcms"
        ></el-input>
      </el-form-item>
    </el-form>

    <el-form label-position="top" :inline="true">
      <el-form-item label="PIS" prop="pis">
        <el-input placeholder="Insira" v-model="creditForm.pis"></el-input>
      </el-form-item>
      <el-form-item label="Valor" prop="valuePis">
        <el-input
          placeholder="Insira"
          v-model="creditForm.valuePis"
        ></el-input>
      </el-form-item>
    </el-form>

    <el-form label-position="top" :inline="true">
      <el-form-item label="COFINS" prop="cofins">
        <el-input placeholder="Insira" v-model="creditForm.cofins"></el-input>
      </el-form-item>
      <el-form-item label="Valor" prop="valueCofins">
        <el-input
          placeholder="Insira"
          v-model="creditForm.valueCofins"
        ></el-input>
      </el-form-item>
    </el-form>

    <el-form label-position="top" :inline="true">
      <el-form-item label="Margem" prop="margin">
        <el-input placeholder="Insira" v-model="creditForm.margin"></el-input>
      </el-form-item>
      <el-form-item label="Valor" prop="valueMargin">
        <el-input
          placeholder="Insira"
          v-model="creditForm.valueMargin"
        ></el-input>
      </el-form-item>
    </el-form>

    <el-form label-position="top" :inline="true">
      <el-form-item label="Mark Up Divisor" prop="markUpDivisor">
        <el-input placeholder="Insira" v-model="creditForm.markUpDivisor"></el-input>
      </el-form-item>
      <el-form-item label="Valor" prop="valueMarkUpDivisor">
        <el-input
          placeholder="Insira"
          v-model="creditForm.valueMarkUpDivisor"
        ></el-input>
      </el-form-item>
    </el-form>

    <el-form label-position="top" :inline="true">
      <el-form-item label="IPI" prop="ipi">
        <el-input placeholder="Insira" v-model="creditForm.ipi"></el-input>
      </el-form-item>
      <el-form-item label="Valor" prop="valueIpi">
        <el-input
          placeholder="Insira"
          v-model="creditForm.valueIpi"
        ></el-input>
      </el-form-item>
    </el-form>

    <el-divider />

    <strong>TOTAL ENCARGOS</strong>

    <div class="row">
      <div class="col-12 text-right">
        <el-form
          label-position="top"
          label-width="120px"
          :inline="true"
          class="demo-vehicleForm"
        >
          <el-form-item label="Percentagem" prop="margin">
            <el-input
              placeholder="Insira"
              v-model="creditForm.totalChargesPercentage"
            ></el-input>
          </el-form-item>
          <el-form-item label="TOTAL" class="text-left" prop="charges">
            <el-input readonly v-model="totalCharges"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    
    <el-divider />

    <div class="row">
      <div class="col-12 text-right">
        <el-form
          label-position="top"
          label-width="120px"
          :inline="true"
          class="demo-vehicleForm"
        >
          <el-form-item label="TOTAL NF DE SAIDA (BASE + IPI)" class="text-left" prop="totalLastNF">
            <el-input readonly v-model="totalLastNF"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    
    <el-divider />

    <div class="row">
      <div class="col-12 text-right">
        <el-form
          label-position="top"
          label-width="120px"
          :inline="true"
          class="demo-vehicleForm"
        >
          <el-form-item label="TOTAL DESEMBOLSO" class="text-left" prop="totalOutcome">
            <el-input readonly v-model="totalOutcome"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FinalStep",
  data() {
    return {
      totalOutcome: "",
      totalLastNF: "",
      totalCharges: "1000",
      creditForm: {
        ipi: "",
        icms: "",
        pis: "",
        cofins: "",
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
