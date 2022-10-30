import store from "@/store";
import StringToDouble from "./common/StringToDouble";
import handlePercentageCalc from "@/utils/common/PercentageTotalCalc";

export default (data) => {
  const costFormData = { ...store.getters.getCostDataFromCache };
  const stepRendered = store.getters.getStepsRendered.find(
    (step) => step.name === "VehicleData"
  );

  const totalCostData = (
    parseFloat(StringToDouble(costFormData.fob)) +
    parseFloat(StringToDouble(costFormData.shipping)) +
    parseFloat(StringToDouble(costFormData.insurance)) +
    parseFloat(StringToDouble(costFormData.thc))
  ).toFixed(2);

  let { storage, afrmm } = data;

  //   afrmm = (StringToDouble(variablesToCalc.shipping) * StringToDouble(variablesToCalc.currencyTax)).toFixed(2);
  storage = handlePercentageCalc(0.65, totalCostData);

  afrmm = (parseFloat(StringToDouble(costFormData.shipping)) / 4).toFixed(2);

  let baseDataRender = {};
  if (stepRendered) {
    if (
      stepRendered.count === 0 &&
      !Object.keys(costFormData).includes("thc")
    ) {
      baseDataRender = {
        dtc: "1750,00",
        ctr: "1950,00",
        docs: "100,00",
        sda: "1100,00",
        dispatch: "2000,00",
      };
    }
  }

  return { ...data, storage, afrmm, ...baseDataRender };
};
