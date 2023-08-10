import store from "@/store";
import StringToDouble from "./common/StringToDouble";
import handlePercentageCalc from "@/utils/common/PercentageTotalCalc";

export default (data) => {
  const importFormData = { ...store.getters.getImportDataFromCache };
  const costFormData = { ...store.getters.getCostDataFromCache };
  const stepRendered = store.getters.getStepsRendered.find(
    (step) => step.name === "VehicleData"
  );

  // const totalCostData = (
  //   parseFloat(StringToDouble(costFormData.fob)) +
  //   parseFloat(StringToDouble(costFormData.shipping)) +
  //   parseFloat(StringToDouble(costFormData.insurance)) +
  //   parseFloat(StringToDouble(costFormData.thc))
  // ).toFixed(2);

  let { storage, afrmm, unloading, assurance, plataform } = data;

  storage = handlePercentageCalc(0.60,  parseFloat(StringToDouble(costFormData.fob)));

  afrmm = parseFloat(handlePercentageCalc(25, StringToDouble(costFormData.shipping)));

  assurance = handlePercentageCalc(0.20,  parseFloat(StringToDouble(costFormData.fob)));

  plataform = handlePercentageCalc(0.25,  parseFloat(StringToDouble(costFormData.fob)));

  unloading = parseFloat(
    parseFloat(StringToDouble("R$ 2250,00")) +
      parseFloat(handlePercentageCalc(0.60, StringToDouble(costFormData.fob)))
  ).toFixed(2);

  let totalSum = (
    parseFloat(StringToDouble(importFormData.unloading)) +
    parseFloat(StringToDouble(importFormData.storage)) +
    parseFloat(StringToDouble(importFormData.afrmm)) +
    // parseFloat(StringToDouble(importFormData.dtc)) +
    parseFloat(StringToDouble(importFormData.plataform)) +
    parseFloat(StringToDouble(importFormData.ctr)) +
    parseFloat(StringToDouble(importFormData.docs)) +
    parseFloat(StringToDouble(importFormData.sda)) +
    parseFloat(StringToDouble(importFormData.blLiberation)) +
    parseFloat(StringToDouble(importFormData.assurance)) +
    parseFloat(StringToDouble(importFormData.dispatch))
  ).toFixed(2);

  let baseDataRender = {};
  if (stepRendered) {
    if (
      stepRendered.count === 0 &&
      !Object.keys(importFormData).includes("ctr")
    ) {
      baseDataRender = {
        // dtc: "1750,00",
        blLiberation: "2590,15",
        ctr: "1950,00",
        docs: "250,00",
        sda: "1320,00",
        dispatch: "2000,00",
      };
    }
  }

  return { ...data, storage, afrmm, unloading, assurance, plataform, ...baseDataRender, totalSum };
};
