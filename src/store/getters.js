import Cookies from "js-cookie";

export default {
  getCurrency(state) {
    return state.currency;
  },
  getVehicleDataFromCache(state) {
    if (Object.keys(state.vehicleData).length > 0) {
      return state.vehicleData;
    }
    return Cookies.get("vehicleData")
      ? JSON.parse(Cookies.get("vehicleData"))
      : null;
  },
  getCostDataFromCache(state) {
    if (Object.keys(state.costData).length > 0) {
      return state.costData;
    }
    return Cookies.get("costData")
      ? JSON.parse(Cookies.get("costData"))
      : null;
  },
  getTributeDataFromCache(state) {
    if (Object.keys(state.tributeData).length > 0) {
      return state.tributeData;
    }
    return Cookies.get("tributeData")
      ? JSON.parse(Cookies.get("tributeData"))
      : null;
  },
  getCreditDataFromCache(state) {
    if (Object.keys(state.creditData).length > 0) {
      return state.creditData;
    }
    return Cookies.get("creditData")
      ? JSON.parse(Cookies.get("creditData"))
      : null;
  },
  getImportDataFromCache(state) {
    if (Object.keys(state.importData).length > 0) {
      return state.importData;
    }
    return Cookies.get("importData")
      ? JSON.parse(Cookies.get("importData"))
      : null;
  },
  getFinalStepFromCache(state) {
    if (Object.keys(state.finalStep).length > 0) {
      return state.finalStep;
    }
    return Cookies.get("finalStep")
      ? JSON.parse(Cookies.get("finalStep"))
      : null;
  },
};
