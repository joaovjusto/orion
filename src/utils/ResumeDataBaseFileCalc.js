import store from "@/store";
import handlePercentageCalc from "@/utils/common/PercentageTotalCalc";
import StringToDouble from "./common/StringToDouble";

export default (data) => {
  const resumeDataFormData = { ...store.getters.getResumeDataFromCache };
  const vehicleFormData = { ...store.getters.getVehicleDataFromCache };
  const importFormData = { ...store.getters.getImportDataFromCache };
  const stepRendered = store.getters.getStepsRendered.find(
    (step) => step.name === "ResumeData"
  );

  let baseDataRender = {};

  if (!stepRendered) {
    if (!Object.keys(resumeDataFormData).includes("alfandegaryValidation")) {
      baseDataRender = {
        parallelCurrency: "5,05",
        visionLeadValuePercent: "9%",
        salesTaxModifier: "7%",
        exteriorComission: "2500,00",
        carCollect: "1500,00",
        agio: "0,00",
        acessoryDealer: "25000,00",
        alfandegaryValidation: "500,00",
        containerRentValue: "1000,00",
        stuffing: "350,00",
        shippingFee: "1000,00",
        homologation: "2000,00",
      };
    }
  }

  let salesTax = 0

  if (resumeDataFormData.salesTaxModifier) {
    salesTax = handlePercentageCalc(
      parseFloat(resumeDataFormData.salesTaxModifier.replace("%", "")),
      parseFloat(StringToDouble(vehicleFormData.fob))
    );
  }


  const totalExteriorCosts = (
    parseFloat(StringToDouble(resumeDataFormData.salesTax)) +
    parseFloat(StringToDouble(resumeDataFormData.exteriorComission)) +
    parseFloat(StringToDouble(resumeDataFormData.carCollect)) +
    parseFloat(StringToDouble(resumeDataFormData.agio)) +
    parseFloat(StringToDouble(resumeDataFormData.alfandegaryValidation)) +
    parseFloat(StringToDouble(resumeDataFormData.containerRentValue)) +
    parseFloat(StringToDouble(resumeDataFormData.stuffing)) +
    parseFloat(StringToDouble(resumeDataFormData.shippingFee)) +
    parseFloat(StringToDouble(resumeDataFormData.homologation)) +
    parseFloat(StringToDouble(resumeDataFormData.acessoryDealer))
  ).toFixed(2);

  let totalCotation = 0;
  totalCotation = parseFloat(StringToDouble(resumeDataFormData.parallelCurrency))

  const totalCostReais = parseFloat(
    totalCotation *
      parseFloat(StringToDouble(totalExteriorCosts))
  ).toFixed(2);

  let totalSum = 0;

  if (importFormData.totalCostImp && resumeDataFormData.totalCostReais) {
    totalSum = (
      parseFloat(importFormData.totalCostImp) +
      parseFloat(resumeDataFormData.totalCostReais)
    ).toFixed(2);
  }

  let visionLeadValue = 0

  if (resumeDataFormData.visionLeadValuePercent) {
    visionLeadValue = handlePercentageCalc(parseFloat(resumeDataFormData.visionLeadValuePercent.replace("%", "")), totalSum);
  }

  let totalImportCost = (
    parseFloat(totalSum) +
    parseFloat(visionLeadValue)
  ).toFixed(2);

  // let iva = parseFloat(
  //   parseFloat(StringToDouble(totalCotation)) *
  //     parseFloat(StringToDouble(salesTax))
  // ).toFixed(2);

  // let finalValue = (parseFloat(totalImportCost) - parseFloat(iva)).toFixed(2);

  console.log(totalSum,
    visionLeadValue,totalImportCost);

  console.log({...data,
    ...baseDataRender,
    salesTax,
    totalExteriorCosts,
    totalCostReais,
    visionLeadValue,
    totalImportCost,});

  return {
    ...data,
    ...baseDataRender,
    salesTax,
    totalExteriorCosts,
    totalCostReais,
    visionLeadValue,
    totalImportCost,
    // iva,
    // finalValue,
  };
};
