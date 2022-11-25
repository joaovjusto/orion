import store from "@/store";
import handlePercentageCalc from "@/utils/common/PercentageTotalCalc";
import StringToDouble from "./common/StringToDouble";

export default (data) => {
  const resumeDataFormData = { ...store.getters.getResumeDataFromCache };
  const variablesToCalc = { ...store.getters.getVehicleDataFromCache };
  const finalStepFormData = { ...store.getters.getFinalStepFromCache };
  const stepRendered = store.getters.getStepsRendered.find(
    (step) => step.name === "ResumeData"
  );

  let baseDataRender = {};

  if (!stepRendered) {
    if (Object.keys(resumeDataFormData).length === 0) {
      baseDataRender = {
        marginValue: "10%",
      };
    }
  }

  const profit = handlePercentageCalc(
    data.marginValue.replace("%", ""),
    parseFloat(finalStepFormData.totalOutcome).toFixed(2)
  );

  const costUsaBrl = (StringToDouble(data.costUsa) * StringToDouble(variablesToCalc.currencyTax)).toFixed(2);

  const homologation = (StringToDouble(data.homologationBrl) / StringToDouble(variablesToCalc.currencyTax)).toFixed(2);

  const total = (
    parseFloat(costUsaBrl) +
    parseFloat(StringToDouble(data.homologationBrl))
  ).toFixed(2);

  const totalCost = (
    parseFloat(finalStepFormData.totalOutcome) +
    parseFloat(profit) +
    parseFloat(total)
  ).toFixed(2);
  
  return { ...data, ...baseDataRender, profit, costUsaBrl, homologation, total, totalCost };
};
