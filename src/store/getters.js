import Cookies from "js-cookie";

export default {
  getLoadingState(state) {
    state.loading
  },
  getCurrency(state) {
    return state.currency;
  },
  getStepsRendered(state) {
    return state.stepsRendered;
  },
  getImagesCarTemplate(state) {
    return state.imagesCarTemplate;
  },
  getVideoData(state) {
    return state.videoData;
  },
  getDescriptionData(state) {
    return state.descriptionData;
  },
  getVehicleDataFromCache(state) {
    if (Object.keys(state.vehicleData).length > 0) {
      return state.vehicleData;
    }
    return Cookies.get("vehicleData")
      ? JSON.parse(Cookies.get("vehicleData"))
      : {};
  },
  getResumeDataFromCache(state) {
    if (Object.keys(state.resumeData).length > 0) {
      return state.resumeData;
    }
    return Cookies.get("resumeData")
      ? JSON.parse(Cookies.get("resumeData"))
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
  getImportDataFromCache(state) {
    if (Object.keys(state.importData).length > 0) {
      return state.importData;
    }
    return Cookies.get("importData")
      ? JSON.parse(Cookies.get("importData"))
      : {};
  },
  // getFinalStepFromCache(state) {
  //   if (Object.keys(state.finalStep).length > 0) {
  //     return state.finalStep;
  //   }
  //   return Cookies.get("finalStep")
  //     ? JSON.parse(Cookies.get("finalStep"))
  //     : {};
  // },
  getUserFromCache(state) {
    if (Object.keys(state.user).length > 0) {
      return state.user;
    }
    return Cookies.get("user")
      ? JSON.parse(Cookies.get("user"))
      : {};
  },
  getProposal(state) {
    return state.proposal;
  },
};
