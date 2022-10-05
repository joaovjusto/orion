import Cookies from "js-cookie";

export default {
  getVehicleDataFromCache() {
    return Cookies.get("vehicleData")
      ? JSON.parse(Cookies.get("vehicleData"))
      : null;
  },
};
