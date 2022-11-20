import store from "@/store";
// import StringToDouble from "./common/StringToDouble";
// import handlePercentageCalc from "@/utils/common/PercentageTotalCalc";

export default (data) => {
  const finalStepFormData = { ...store.getters.getFinalStepFromCache };
  const stepRendered = store.getters.getStepsRendered.find(
    (step) => step.name === "FinalStep"
  );

  let baseDataRender = {};
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
    ...baseDataRender
  };
};
