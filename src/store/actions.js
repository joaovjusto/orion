import Cookies from "js-cookie";

export default {
  updateCurrencyData({ commit }, currency) {
    commit("SET_CURRENCY", currency);
  },
  updateBrowserCache(_, cache) {
    // Clear old cookies with 7d expiration
    if (!Cookies.get('oldCookies')) {
      Object.keys(Cookies.get()).forEach(cookie => {
        Cookies.remove(cookie)
      });
      Cookies.set('oldCookies', true)

      setTimeout(() => {
        location.reload()
      }, 1000)
    }else {
      if (cache.name && cache.data) {
        Cookies.set(cache.name, JSON.stringify(cache.data), { expires: 1 });
      }
    }
  },
  updateFormTreeData({ commit, dispatch }, { data, stepName }) {
    const steps = {
      vehicleData: (stepData) => commit("SET_VEHICLE_DATA", stepData),
      costData: (stepData) => commit("SET_COST_DATA", stepData),
      tributeData: (stepData) => commit("SET_TRIBUTE_DATA", stepData),
      importData: (stepData) => commit("SET_IMPORT_DATA", stepData),
      finalStep: (stepData) => commit("SET_FINAL_STEP", stepData),
      resumeData: (stepData) => commit("SET_RESUME_DATA", stepData),
      default: (stepData) => {
        return stepData;
      },
    };

    steps[stepName] ? steps[stepName](data) : steps["default"](data);
    dispatch("updateBrowserCache", { name: stepName, data });
  },
  updateStepsRendered({ commit }, stepsRendered) {
    commit("SET_STEPS_RENDERED", stepsRendered);
  },
  updateAllSteps({ commit, getters }) {
    commit("SET_VEHICLE_DATA", getters.getVehicleDataFromCache);
    commit("SET_COST_DATA", getters.getCostDataFromCache);
    commit("SET_TRIBUTE_DATA", getters.getTributeDataFromCache);
    commit("SET_IMPORT_DATA", getters.getImportDataFromCache);
    commit("SET_FINAL_STEP", getters.getFinalStepFromCache);
    commit("SET_RESUME_DATA", getters.getResumeDataFromCache);
  },
};
