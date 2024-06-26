import store from "@/store";
import StringToDouble from "./common/StringToDouble";

export default (data) => {
  const costFormData = { ...store.getters.getCostDataFromCache };
  const variablesToCalc = { ...store.getters.getVehicleDataFromCache };
  const stepRendered = store.getters.getStepsRendered.find(
    (step) => step.name === "VehicleData"
  );
  
  let { fob, shipping } = data;

  fob = (StringToDouble(variablesToCalc.fob) * StringToDouble(variablesToCalc.currencyTax)).toFixed(2);
  shipping = (StringToDouble(variablesToCalc.shipping) * StringToDouble(variablesToCalc.currencyTax)).toFixed(2);

  let totalSum = (
    parseFloat(StringToDouble(costFormData.fob)) +
    parseFloat(StringToDouble(costFormData.shipping)) +
    parseFloat(StringToDouble(costFormData.insurance)) +
    parseFloat(StringToDouble(costFormData.thc))
  ).toFixed(2);

  let baseDataRender = {};
  if (stepRendered) {
    if (stepRendered.count === 0 && !Object.keys(costFormData).includes('thc')) {
      baseDataRender = {
        thc: "547,00",
        insurance: "0",
        qtdeContainers: "1",
      };
    }
  }

  return { ...data, fob, shipping, totalSum, ...baseDataRender };
};
