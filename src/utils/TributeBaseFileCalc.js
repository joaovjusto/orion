import store from "@/store";
import StringToDouble from "./common/StringToDouble";
import handlePercentageCalc from "@/utils/common/PercentageTotalCalc";

export default (data) => {
  const costFormData = { ...store.getters.getCostDataFromCache };
  const tributeFormData = { ...store.getters.getTributeDataFromCache };
  const importFormData = { ...store.getters.getImportDataFromCache };
  const stepRendered = store.getters.getStepsRendered.find(
    (step) => step.name === "TributeData"
  );

  const totalCostData = (
    parseFloat(StringToDouble(costFormData.fob)) +
    parseFloat(StringToDouble(costFormData.shipping)) +
    parseFloat(StringToDouble(costFormData.insurance)) +
    parseFloat(StringToDouble(costFormData.thc))
  ).toFixed(2);

  let baseDataRender = {};
  if (!stepRendered) {
    if (Object.keys(tributeFormData).length === 0) {
      baseDataRender = {
        ii: "35%",
        ipi: "18.81%",
        pis: "2.62%",
        cofins: "12.57%",
        // valueTus: "R$ 214,50",
        icms: "12%",
        icmsBaseCalc: "88%",
      };
    }
  }

  let valueIi = 0;
  let valueIpi = 0;
  let valuePis = 0;
  let valueCofins = 0;

  if (Object.keys(tributeFormData).length > 0) {
    valueIi = handlePercentageCalc(
      tributeFormData.ii?.replace("%", ""),
      totalCostData
    );
    valueIpi = handlePercentageCalc(
      tributeFormData.ipi?.replace("%", ""),
      parseFloat(totalCostData) + parseFloat(valueIi)
    );
    valuePis = handlePercentageCalc(
      tributeFormData.pis?.replace("%", ""),
      totalCostData
    );
    valueCofins = handlePercentageCalc(
      tributeFormData.cofins?.replace("%", ""),
      totalCostData
    );
  }

  let totalSum = (
    parseFloat(StringToDouble(tributeFormData.valueIi)) +
    parseFloat(StringToDouble(tributeFormData.valueIpi)) +
    parseFloat(StringToDouble(tributeFormData.valuePis)) +
    parseFloat(StringToDouble(tributeFormData.valueCofins)) 
    // +
    // parseFloat(StringToDouble(tributeFormData.valueIcms))
    //  +
    // parseFloat(StringToDouble(tributeFormData.valueTus))
  ).toFixed(2);
  
  let baseValueIcmsFinal = (
    parseFloat(StringToDouble(costFormData.totalSum)) +
    parseFloat(StringToDouble(totalSum)) +
    parseFloat(StringToDouble(importFormData.siscomex)) +
    parseFloat(StringToDouble(importFormData.marineMerchant))
  ).toFixed(2);

  let valueIcmsFinal = (
    parseFloat(StringToDouble(baseValueIcmsFinal)) /
    parseFloat(parseFloat(tributeFormData.icmsBaseCalc) / 100)
  ).toFixed(2);

  let valueIcms = handlePercentageCalc(
    tributeFormData.icms?.replace("%", ""),
    valueIcmsFinal
  );

  return {
    ...data,
    ...baseDataRender,
    valueIi,
    valueIpi,
    valuePis,
    valueCofins,
    valueIcms,
    totalSum,
    valueIcmsFinal,
  };
};
