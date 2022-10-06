import Cookies from "js-cookie";

export default {
  getVehicleDataFromCache() {
    return Cookies.get("vehicleData")
      ? JSON.parse(Cookies.get("vehicleData"))
      : null;
  },
  getCostDataFromCache() {
    return Cookies.get("costData")
      ? JSON.parse(Cookies.get("costData"))
      : null;
  },
  getTributeDataFromCache() {
    return Cookies.get("tributeData")
      ? JSON.parse(Cookies.get("tributeData"))
      : null;
  },
  getCreditDataFromCache() {
    return Cookies.get("creditData")
      ? JSON.parse(Cookies.get("creditData"))
      : null;
  },
  getImportDataFromCache() {
    return Cookies.get("importData")
      ? JSON.parse(Cookies.get("importData"))
      : null;
  },
  getFinalStepFromCache() {
    return Cookies.get("finalStep")
      ? JSON.parse(Cookies.get("finalStep"))
      : null;
  },
};
