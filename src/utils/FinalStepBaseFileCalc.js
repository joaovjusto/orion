import store from "@/store";
import StringToDouble from "./common/StringToDouble";
// import handlePercentageCalc from "@/utils/common/PercentageTotalCalc";

export default (data) => {
  const costFormData = { ...store.getters.getCostDataFromCache };
  const tributesFormData = { ...store.getters.getTributeDataFromCache };
  const importFormData = { ...store.getters.getImportDataFromCache };
  const finalStepFormData = { ...store.getters.getFinalStepFromCache };
  const stepRendered = store.getters.getStepsRendered.find(
    (step) => step.name === "FinalStep"
  );

  let baseDataRender = {};

  const totalImportData = (
    parseFloat(StringToDouble(importFormData.storage)) +
    parseFloat(StringToDouble(importFormData.afrmm)) +
    parseFloat(StringToDouble(importFormData.dtc)) +
    parseFloat(StringToDouble(importFormData.ctr)) +
    parseFloat(StringToDouble(importFormData.docs)) +
    parseFloat(StringToDouble(importFormData.sda)) +
    parseFloat(StringToDouble(importFormData.dispatch))
  ).toFixed(2);

  const totalTributesData = (
    parseFloat(StringToDouble(tributesFormData.valueIi)) +
    parseFloat(StringToDouble(tributesFormData.valueIpi)) +
    parseFloat(StringToDouble(tributesFormData.valuePis)) +
    parseFloat(StringToDouble(tributesFormData.valueCofins)) +
    parseFloat(StringToDouble(tributesFormData.valueTus))
  ).toFixed(2);

  const totalMinimalTributes = (
    parseFloat(StringToDouble(tributesFormData.valueIpi)) +
    parseFloat(StringToDouble(tributesFormData.valuePis)) +
    parseFloat(StringToDouble(tributesFormData.valueCofins))
  ).toFixed(2);

  const totalCostData = (
    parseFloat(StringToDouble(costFormData.fob)) +
    parseFloat(StringToDouble(costFormData.shipping)) +
    parseFloat(StringToDouble(costFormData.insurance)) +
    parseFloat(StringToDouble(costFormData.thc))
  ).toFixed(2);

  const totalNFLUXOR = (
    parseFloat(totalImportData) +
    parseFloat(totalTributesData) +
    parseFloat(totalCostData)
  ).toFixed(2);

  baseDataRender.totalLiquidCostData = totalNFLUXOR - totalMinimalTributes;

  if (!stepRendered) {
    if (Object.keys(finalStepFormData).length === 0) {
      baseDataRender = {
        cofins: "9.60%",
        margem: "2%",
        pis: "2%",
      };
    }
  }

  return {
    ...data,
    ...baseDataRender,
  };
};
