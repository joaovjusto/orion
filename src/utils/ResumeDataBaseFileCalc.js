import store from "@/store";
import handlePercentageCalc from "@/utils/common/PercentageTotalCalc";
import StringToDouble from "./common/StringToDouble";

export default (data) => {
  const getCurrency = store.getters.getCurrency;
  const resumeDataFormData = { ...store.getters.getResumeDataFromCache };
  const costFormData = { ...store.getters.getCostDataFromCache };
  const vehicleFormData = { ...store.getters.getVehicleDataFromCache };
  const importFormData = { ...store.getters.getImportDataFromCache };
  const tributeFormData = { ...store.getters.getTributeDataFromCache };
  const stepRendered = store.getters.getStepsRendered.find(
    (step) => step.name === "ResumeData"
  );
  const currencyTaxResult = Object.keys(getCurrency).filter((value) =>
    value.includes(vehicleFormData.currency)
  );

  let baseDataRender = {};

  if (!stepRendered) {
    if (!Object.keys(resumeDataFormData).includes("alfandegaryValidation")) {
      baseDataRender = {
        exteriorComission: "2500,00",
        carCollect: "1500,00",
        agio: "0,00",
        alfandegaryValidation: "500,00",
        containerRentValue: "1000,00",
        stuffing: "350,00",
        shippingFee: "1000,00",
        homologation: "2000,00",
      };
    }
  }

  const salesTax = handlePercentageCalc(
    7,
    parseFloat(StringToDouble(costFormData.fob))
  );

  const totalExteriorCosts = (
    parseFloat(StringToDouble(resumeDataFormData.salesTax)) +
    parseFloat(StringToDouble(resumeDataFormData.exteriorComission)) +
    parseFloat(StringToDouble(resumeDataFormData.carCollect)) +
    parseFloat(StringToDouble(resumeDataFormData.agio)) +
    parseFloat(StringToDouble(resumeDataFormData.alfandegaryValidation)) +
    parseFloat(StringToDouble(resumeDataFormData.containerRentValue)) +
    parseFloat(StringToDouble(resumeDataFormData.stuffing)) +
    parseFloat(StringToDouble(resumeDataFormData.shippingFee)) +
    parseFloat(StringToDouble(resumeDataFormData.homologation))
  ).toFixed(2);

  let totalCotation = 0;
  if (getCurrency[currencyTaxResult]) {
    totalCotation = parseFloat(getCurrency[currencyTaxResult].ask).toFixed(2);
  }

  const totalCostReais = parseFloat(
    parseFloat(StringToDouble(totalCotation)) *
      parseFloat(StringToDouble(totalExteriorCosts))
  ).toFixed(2);

  let totalSum = (
    parseFloat(importFormData.totalSum) +
    parseFloat(tributeFormData.totalSum) +
    parseFloat(costFormData.totalSum)
  ).toFixed(2);

  let visionLeadValue = handlePercentageCalc(11, totalSum);

  let totalImportCost = (
    parseFloat(totalSum) +
    parseFloat(totalCostReais) +
    parseFloat(visionLeadValue)
  ).toFixed(2);

  let iva = parseFloat(
    parseFloat(StringToDouble(totalCotation)) *
      parseFloat(StringToDouble(salesTax))
  ).toFixed(2);

  let finalValue = (parseFloat(totalImportCost) - parseFloat(iva)).toFixed(2);

  return {
    ...data,
    ...baseDataRender,
    salesTax,
    totalExteriorCosts,
    totalCostReais,
    visionLeadValue,
    totalImportCost,
    iva,
    finalValue,
  };
};
