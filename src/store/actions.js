import Cookies from "js-cookie";

export default {
  updateCurrencyData({ commit }, currency) {
    commit("SET_CURRENCY", currency);
  },
  updateBrowserCache(_, cache) {
    if (cache.name && cache.data) {
      Cookies.set(cache.name, JSON.stringify(cache.data), { expires: 7 });
    }
  },
  updateFormTreeData({ commit, dispatch }, { data, stepName }) {
    const steps = {
      vehicleData: (stepData) => commit("SET_VEHICLE_DATA", stepData),
      costData: (stepData) => commit("SET_COST_DATA", stepData),
      tributeData: (stepData) => commit("SET_TRIBUTE_DATA", stepData),
      creditData: (stepData) => commit("SET_CREDIT_DATA", stepData),
      importData: (stepData) => commit("SET_IMPORT_DATA", stepData),
      finalStep: (stepData) => commit("SET_FINAL_STEP", stepData),
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
  updateAllSteps({ commit }) {
    commit("SET_VEHICLE_DATA", {});
    commit("SET_COST_DATA", {});
    commit("SET_TRIBUTE_DATA", {});
    commit("SET_CREDIT_DATA", {});
    commit("SET_IMPORT_DATA", {});
    commit("SET_FINAL_STEP", {});
  },
};
