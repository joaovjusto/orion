import Cookies from "js-cookie";

export default {
  getCurrency(state) {
    return state.currency;
  },
  getStepsRendered(state) {
    return state.stepsRendered;
  },
  getVehicleDataFromCache(state) {
    if (Object.keys(state.vehicleData).length > 0) {
      return state.vehicleData;
    }
    return Cookies.get("vehicleData")
      ? JSON.parse(Cookies.get("vehicleData"))
      : {};
  },
  getCostDataFromCache(state) {
    if (Object.keys(state.costData).length > 0) {
      return state.costData;
    }
    return Cookies.get("costData")
      ? JSON.parse(Cookies.get("costData"))
      : {};
  },
  getTributeDataFromCache(state) {
    if (Object.keys(state.tributeData).length > 0) {
      return state.tributeData;
    }
    return Cookies.get("tributeData")
      ? JSON.parse(Cookies.get("tributeData"))
      : {};
  },
  getCreditDataFromCache(state) {
    if (Object.keys(state.creditData).length > 0) {
      return state.creditData;
    }
    return Cookies.get("creditData")
      ? JSON.parse(Cookies.get("creditData"))
      : {};
  },
  getImportDataFromCache(state) {
    if (Object.keys(state.importData).length > 0) {
      return state.importData;
    }
    return Cookies.get("importData")
      ? JSON.parse(Cookies.get("importData"))
      : {};
  },
  getFinalStepFromCache(state) {
    if (Object.keys(state.finalStep).length > 0) {
      return state.finalStep;
    }
    return Cookies.get("finalStep")
      ? JSON.parse(Cookies.get("finalStep"))
      : {};
  },
};
