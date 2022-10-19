import store from "@/store";
// import StringToDouble from "./common/StringToDouble";

export default (data) => {
//   const costFormData = { ...store.getters.getCostDataFromCache };
  const tributeFormData = { ...store.getters.getTributeDataFromCache };
  const stepRendered = store.getters.getStepsRendered.find(
    (step) => step.name === "TributeData"
  );

//   const totalCostData = (
//     parseFloat(StringToDouble(costFormData.fob)) +
//     parseFloat(StringToDouble(costFormData.shipping)) +
//     parseFloat(StringToDouble(costFormData.insurance)) +
//     parseFloat(StringToDouble(costFormData.thc))
//   ).toFixed(2);

  let baseDataRender = {};
  if (!stepRendered) {
    if (Object.keys(tributeFormData).length === 0) {
      baseDataRender = {
        ii: "35%",
        ipi: "25%",
        pis: "2.62%",
        cofins: "12.57%",
        valueTus: "R$ 214,50",
      };
    }
  }

//   console.log(totalCostData);

  return { ...data, ...baseDataRender };
};
