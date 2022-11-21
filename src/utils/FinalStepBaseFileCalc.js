import store from "@/store";
import StringToDouble from "./common/StringToDouble";
import handlePercentageToNumber from "@/utils/common/PercentageToNumber";
// import handlePercentageCalc from "@/utils/common/PercentageTotalCalc";

export default (data) => {
  const costFormData = { ...store.getters.getCostDataFromCache };
  const tributesFormData = { ...store.getters.getTributeDataFromCache };
  const importFormData = { ...store.getters.getImportDataFromCache };
  const finalStepFormData = { ...store.getters.getFinalStepFromCache };
  const vehicleFormData = { ...store.getters.getVehicleDataFromCache };
  const stepRendered = store.getters.getStepsRendered.find(
    (step) => step.name === "FinalStep"
  );

  let baseDataRender = {};

  // First item of form

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

  baseDataRender.totalLiquidCostData = (
    parseFloat(totalNFLUXOR) - parseFloat(totalMinimalTributes)
  ).toFixed(2);

  // First item of form

  // Last step of form first load items

  if (!stepRendered) {
    if (Object.keys(finalStepFormData).length === 0) {
      baseDataRender = {
        cofins: "9.60%",
        margin: "2%",
        pis: "2%",
      };
    }
  }

  // Last step of form static items

  const icms = vehicleFormData.icmsDestination;
  const ipi = tributesFormData.ipi;

  const totalChargesPercentage = (
    parseFloat(handlePercentageToNumber(icms)) +
    parseFloat(handlePercentageToNumber(data.cofins)) +
    parseFloat(handlePercentageToNumber(data.margin)) +
    parseFloat(handlePercentageToNumber(data.pis))
  ).toFixed(2).toString() + '%';

  const markUpDivisor = ((1 - (parseFloat(totalChargesPercentage) / 100)) * 100).toFixed(2).toString() + '%'

  const invoiceValue = (
    (parseFloat(totalNFLUXOR) - parseFloat(totalMinimalTributes)) /
    ((parseFloat(markUpDivisor) / 100).toFixed(3))
  ).toFixed(2);

  return {
    ...data,
    ...baseDataRender,
    icms,
    ipi,
    markUpDivisor,
    invoiceValue,
    totalChargesPercentage
  };
};
