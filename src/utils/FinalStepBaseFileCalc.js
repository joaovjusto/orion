import store from "@/store";
import StringToDouble from "./common/StringToDouble";
import handlePercentageToNumber from "@/utils/common/PercentageToNumber";
import handlePercentageCalc from "@/utils/common/PercentageTotalCalc";

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

  const totalLiquidCostData = (
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

  const totalChargesPercentage =
    (
      parseFloat(handlePercentageToNumber(icms)) +
      parseFloat(handlePercentageToNumber(data.cofins)) +
      parseFloat(handlePercentageToNumber(data.margin)) +
      parseFloat(handlePercentageToNumber(data.pis))
    )
      .toFixed(2)
      .toString() + "%";

  const markUpDivisor =
    ((1 - parseFloat(totalChargesPercentage) / 100) * 100)
      .toFixed(2)
      .toString() + "%";

  const invoiceValue = (
    (parseFloat(totalNFLUXOR) - parseFloat(totalMinimalTributes)) /
    (parseFloat(markUpDivisor) / 100).toFixed(3)
  ).toFixed(2);

  // Calculating monetary values
  let valuePis = 0;
  let valueIcms = 0;
  let valueIpi = 0;
  let valueCofins = 0;
  let valueMargin = 0;
  let totalCharges = 0;
  let totalLastNF = 0;
  let totalOutcome = 0;

  const baseCalcValuesSum =
    (parseFloat(totalNFLUXOR) -
      parseFloat(tributesFormData.valueIpi) -
      parseFloat(tributesFormData.valuePis) -
      parseFloat(tributesFormData.valueCofins)) /
    (parseFloat(markUpDivisor) / 100).toFixed(3);

  if (Object.keys(finalStepFormData).length > 0) {
    valueIcms = handlePercentageCalc(
      icms.replace("%", ""),
      parseFloat(invoiceValue).toFixed(2)
    );

    valuePis = (
      baseCalcValuesSum * (parseFloat(finalStepFormData.pis) / 100).toFixed(3)
    ).toFixed(2);
    valueCofins = (
      baseCalcValuesSum *
      (parseFloat(finalStepFormData.cofins) / 100).toFixed(3)
    ).toFixed(2);
    valueMargin = (
      baseCalcValuesSum *
      (parseFloat(finalStepFormData.margin) / 100).toFixed(3)
    ).toFixed(2);
    valueIpi = (baseCalcValuesSum * (parseFloat(ipi) / 100).toFixed(3)).toFixed(
      2
    );

    totalCharges = (
      parseFloat(valueIcms) +
      parseFloat(valuePis) +
      parseFloat(valueCofins) +
      parseFloat(valueMargin)
    ).toFixed(2);

    totalLastNF = (parseFloat(invoiceValue) + parseFloat(valueIpi)).toFixed(2);

    totalOutcome = totalLastNF;
  }

  return {
    ...data,
    ...baseDataRender,
    totalOutcome,
    totalLastNF,
    totalCharges,
    valuePis,
    valueIpi,
    valueMargin,
    valueIcms,
    valueCofins,
    totalLiquidCostData,
    icms,
    ipi,
    markUpDivisor,
    invoiceValue,
    totalChargesPercentage,
  };
};
