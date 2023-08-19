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

  if (!stepRendered) {
    if (Object.keys(finalStepFormData).length === 0) {
      baseDataRender = {
        cofins: "9.60%",
        margin: "2%",
        pis: "2%",
      };
    }
  }

  // Declaring variables out of scope
  let totalImportData = 0;
  let totalTributesData = 0;
  let totalMinimalTributes = 0;
  let totalCostData = 0;
  let totalNFLUXOR = 0;
  let totalLiquidCostData = 0;
  let icms = 0;
  let ipi = 0;
  let invoiceValue = 0;
  let baseCalcValuesSum = 0;
  let totalChargesPercentage = "0%";
  let markUpDivisor = "0%";

  let valuePis = 0;
  let valueIcms = 0;
  let valueIpi = 0;
  let valueCofins = 0;
  let valueMargin = 0;
  let totalCharges = 0;
  let totalLastNF = 0;
  let totalOutcome = 0;

  // Last step of form static items
  if (Object.keys(finalStepFormData).length > 0) {
    totalImportData = (
      parseFloat(StringToDouble(importFormData.storage)) +
      parseFloat(StringToDouble(importFormData.afrmm)) +
      parseFloat(StringToDouble(importFormData.dtc)) +
      parseFloat(StringToDouble(importFormData.ctr)) +
      parseFloat(StringToDouble(importFormData.docs)) +
      parseFloat(StringToDouble(importFormData.sda)) +
      parseFloat(StringToDouble(importFormData.dispatch))
    ).toFixed(2);

    totalTributesData = (
      parseFloat(StringToDouble(tributesFormData.valueIi)) +
      parseFloat(StringToDouble(tributesFormData.valueIpi)) +
      parseFloat(StringToDouble(tributesFormData.valuePis)) +
      parseFloat(StringToDouble(tributesFormData.valueCofins)) +
      parseFloat(StringToDouble(tributesFormData.valueTus))
    ).toFixed(2);

    totalMinimalTributes = (
      parseFloat(StringToDouble(tributesFormData.valueIpi)) +
      parseFloat(StringToDouble(tributesFormData.valuePis)) +
      parseFloat(StringToDouble(tributesFormData.valueCofins))
    ).toFixed(2);

    totalCostData = (
      parseFloat(StringToDouble(costFormData.fob)) +
      parseFloat(StringToDouble(costFormData.shipping)) +
      parseFloat(StringToDouble(costFormData.insurance)) +
      parseFloat(StringToDouble(costFormData.thc))
    ).toFixed(2);

    totalNFLUXOR = (
      parseFloat(totalImportData) +
      parseFloat(totalTributesData) +
      parseFloat(totalCostData)
    ).toFixed(2);

    totalLiquidCostData = (
      parseFloat(totalNFLUXOR) - parseFloat(totalMinimalTributes)
    ).toFixed(2);

    icms = vehicleFormData.icmsDestination;
    ipi = tributesFormData.ipi;

    totalChargesPercentage =
      (
        parseFloat(handlePercentageToNumber(icms)) +
        parseFloat(handlePercentageToNumber(data.cofins)) +
        parseFloat(handlePercentageToNumber(data.margin)) +
        parseFloat(handlePercentageToNumber(data.pis))
      )
        .toFixed(2)
        .toString() + "%";

    markUpDivisor =
      ((1 - parseFloat(totalChargesPercentage) / 100) * 100)
        .toFixed(2)
        .toString() + "%";

    invoiceValue = (
      (parseFloat(totalNFLUXOR) - parseFloat(totalMinimalTributes)) /
      (parseFloat(markUpDivisor) / 100).toFixed(3)
    ).toFixed(2);

    // Calculating monetary values

    baseCalcValuesSum =
      (parseFloat(totalNFLUXOR) -
        parseFloat(tributesFormData.valueIpi) -
        parseFloat(tributesFormData.valuePis) -
        parseFloat(tributesFormData.valueCofins)) /
      (parseFloat(markUpDivisor) / 100).toFixed(3);

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
