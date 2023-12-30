import store from "@/store";
import StringToDouble from "./common/StringToDouble";
import handlePercentageCalc from "@/utils/common/PercentageTotalCalc";

export default (data) => {
  const tributeFormData = { ...store.getters.getTributeDataFromCache };
  const importFormData = { ...store.getters.getImportDataFromCache };
  const costFormData = { ...store.getters.getCostDataFromCache };
  const stepRendered = store.getters.getStepsRendered.find(
    (step) => step.name === "VehicleData"
  );

  let { marineMerchant, levant, containerWeight, totalCostImp } = data;

  const marineSum =
    parseFloat(StringToDouble(costFormData.shipping)) +
    parseFloat(StringToDouble(importFormData.storageOne));

  marineMerchant = (
    parseFloat(handlePercentageCalc(8, marineSum)) +
    parseFloat(StringToDouble("21.2"))
  ).toFixed(2);

  levant = (
    parseFloat(StringToDouble(costFormData.qtdeContainers)) *
    parseFloat(StringToDouble("358"))
  ).toFixed(2);

  containerWeight = (
    parseFloat(StringToDouble(costFormData.qtdeContainers)) *
    parseFloat(StringToDouble("120"))
  ).toFixed(2);

  let totalSum = (
    parseFloat(StringToDouble(importFormData.siscomex)) +
    parseFloat(StringToDouble(importFormData.marineMerchant)) +
    parseFloat(StringToDouble(importFormData.DTC)) +
    parseFloat(StringToDouble(importFormData.sda)) +
    parseFloat(StringToDouble(importFormData.storageOne)) +
    parseFloat(StringToDouble(importFormData.li)) +
    parseFloat(StringToDouble(importFormData.capatazia)) +
    parseFloat(StringToDouble(importFormData.storageSeco)) +
    parseFloat(StringToDouble(importFormData.levant)) +
    parseFloat(StringToDouble(importFormData.containerWeight)) +
    parseFloat(StringToDouble(importFormData.ibamaLi)) +
    parseFloat(StringToDouble(importFormData.admTax)) +
    parseFloat(StringToDouble(importFormData.desembaraco)) +
    parseFloat(StringToDouble(importFormData.serviceCost))
  ).toFixed(2);

  const totalImportCost =  (
    parseFloat(StringToDouble(tributeFormData.valueIi)) +
    parseFloat(StringToDouble(tributeFormData.valueIpi)) +
    parseFloat(StringToDouble(tributeFormData.valuePis)) +
    parseFloat(StringToDouble(tributeFormData.valueCofins)) +
    parseFloat(StringToDouble(tributeFormData.valueIcms)) 
  ).toFixed(2);

  const totalCostData = (
    parseFloat(StringToDouble(costFormData.fob)) +
    parseFloat(StringToDouble(costFormData.shipping)) +
    parseFloat(StringToDouble(costFormData.insurance)) +
    parseFloat(StringToDouble(costFormData.thc))
  ).toFixed(2);

  totalCostImp = (
    parseFloat(StringToDouble(totalImportCost)) +
    parseFloat(StringToDouble(totalSum)) +
    parseFloat(StringToDouble(totalCostData)) 
  ).toFixed(2);

  let baseDataRender = {};
  if (stepRendered) {
    if (
      stepRendered.count === 0 &&
      !Object.keys(importFormData).includes("ctr")
    ) {
      baseDataRender = {
        siscomex: "154,23",
        DTC: "4950,00",
        sda: "1880,00",
        storageOne: "3800,00",
        li: "660,00",
        capatazia: "4950,00",
        storageSeco: "2800,00",
        ibamaLi: "1278,00",
        admTax: "1250,00",
        desembaraco: "700,00",
        serviceCost: "4000,00",
      };
    }
  }

  console.log({
    ...data,
    ...baseDataRender,
    marineMerchant,
    totalCostImp,
    levant,
    containerWeight,
    totalSum,
    totalImportCost,
  });

  return {
    ...data,
    ...baseDataRender,
    marineMerchant,
    totalCostImp,
    levant,
    containerWeight,
    totalSum,
    totalImportCost,
  };
};
