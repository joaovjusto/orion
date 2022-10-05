import Cookies from "js-cookie";

export default {
  updateBrowserCache(_, cache) {
    if (cache.name && cache.data) {
      Cookies.set(cache.name, JSON.stringify(cache.data), { expires: 7 });
    }
  },
  updateVehicleData({ commit, dispatch }, data) {
    commit("SET_VEHICLE_DATA", data);
    dispatch("updateBrowserCache", { name: "vehicleData", data });
  },
};
