<template>
  <div>
    <el-form
      :model="vehicleForm"
      :rules="rules"
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
      :rules="rules"
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
import { mapActions, mapGetters } from "vuex";
import commonFormMixin from "@/utils/mixins/commonFormMixin";

export default {
  name: "VehicleData",
  mixins: [commonFormMixin],
  data() {
    return {
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
      rules: {
        // name: [
        //   {
        //     required: true,
        //     message: "Please input Activity name",
        //     trigger: "blur",
        //   },
        //   {
        //     min: 3,
        //     max: 5,
        //     message: "Length should be 3 to 5",
        //     trigger: "blur",
        //   },
        // ],
        // region: [
        //   {
        //     required: true,
        //     message: "Please select Activity zone",
        //     trigger: "change",
        //   },
        // ],
        // date1: [
        //   {
        //     type: "date",
        //     required: true,
        //     message: "Please pick a date",
        //     trigger: "change",
        //   },
        // ],
        // date2: [
        //   {
        //     type: "date",
        //     required: true,
        //     message: "Please pick a time",
        //     trigger: "change",
        //   },
        // ],
        // type: [
        //   {
        //     type: "array",
        //     required: true,
        //     message: "Please select at least one activity type",
        //     trigger: "change",
        //   },
        // ],
        // resource: [
        //   {
        //     required: true,
        //     message: "Please select activity resource",
        //     trigger: "change",
        //   },
        // ],
        // desc: [
        //   {
        //     required: true,
        //     message: "Please input activity form",
        //     trigger: "blur",
        //   },
        // ],
      },
    };
  },
  mounted() {
    this.handleCanChangeInput();
  },
  computed: {
    ...mapGetters(["getVehicleDataFromCache", "getCurrency"]),
  },
  methods: {
    ...mapActions(["updateFormTreeData", "updateCurrencyData"]),
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
        const currencyTaxResult = Object.keys(this.getCurrency).filter(
          (value) => value.includes(this.vehicleForm.currency)
        );
        this.vehicleForm.currencyTax = parseFloat(
          this.getCurrency[currencyTaxResult].ask
        ).toFixed(2);

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
          }
        }

        this.updateCurrencyData({ ...this.getCurrency, moneyConfig: moneyConfigOptions[this.vehicleForm.currency] });
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
<style lang="scss" scoped></style>
