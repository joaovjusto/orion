// import Cookies from "js-cookie";

export default {
  updateCurrencyData({ commit }, currency) {
    commit("SET_CURRENCY", currency);
  },
  updateBrowserCache(_, cache) {
    if (cache.name && cache.data) {
      localStorage.setItem(cache.name, JSON.stringify(cache.data), { expires: 1 });
    }
  },
  updateFormTreeData({ commit, dispatch }, { data, stepName }) {
    const steps = {
      vehicleData: (stepData) => commit("SET_VEHICLE_DATA", stepData),
      clientData: (stepData) => commit("SET_COSTUMER_DATA", stepData),
      costData: (stepData) => commit("SET_COST_DATA", stepData),
      tributeData: (stepData) => commit("SET_TRIBUTE_DATA", stepData),
      importData: (stepData) => commit("SET_IMPORT_DATA", stepData),
      // finalStep: (stepData) => commit("SET_FINAL_STEP", stepData),
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
    commit("SET_COSTUMER_DATA", getters.getClientDataFromCache);
    commit("SET_COST_DATA", getters.getCostDataFromCache);
    commit("SET_TRIBUTE_DATA", getters.getTributeDataFromCache);
    commit("SET_IMPORT_DATA", getters.getImportDataFromCache);
    // commit("SET_FINAL_STEP", getters.getFinalStepFromCache);
    commit("SET_RESUME_DATA", getters.getResumeDataFromCache);
  },
  setLoadingState({ commit }, loading) {
    commit("SET_LOADING", loading);
  },
  setUser({ commit }, user) {
    commit("SET_USER", user);
    localStorage.setItem("user", JSON.stringify(user), { expires: 1 });
  },
  setProposal({ commit }, proposal) {
    commit("SET_PROPOSAL", proposal);
  },
};
