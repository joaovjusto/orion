// import Cookies from "js-cookie";

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
    let imagesArr = [];
    if (JSON.parse(localStorage.getItem("carImages"))) {
      imagesArr = JSON.parse(localStorage.getItem("carImages")).images;
    }

    if (state.imagesCarTemplate.length > 0) {
      return state.imagesCarTemplate;
    }

    return imagesArr
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
    return localStorage.getItem("vehicleData")
      ? JSON.parse(localStorage.getItem("vehicleData"))
      : {};
  },
  getResumeDataFromCache(state) {
    if (Object.keys(state.resumeData).length > 0) {
      return state.resumeData;
    }
    return localStorage.getItem("resumeData")
      ? JSON.parse(localStorage.getItem("resumeData"))
      : {};
  },
  getCostDataFromCache(state) {
    if (Object.keys(state.costData).length > 0) {
      return state.costData;
    }
    return localStorage.getItem("costData")
      ? JSON.parse(localStorage.getItem("costData"))
      : {};
  },
  getTributeDataFromCache(state) {
    if (Object.keys(state.tributeData).length > 0) {
      return state.tributeData;
    }
    return localStorage.getItem("tributeData")
      ? JSON.parse(localStorage.getItem("tributeData"))
      : {};
  },
  getImportDataFromCache(state) {
    if (Object.keys(state.importData).length > 0) {
      return state.importData;
    }
    return localStorage.getItem("importData")
      ? JSON.parse(localStorage.getItem("importData"))
      : {};
  },
  // getFinalStepFromCache(state) {
  //   if (Object.keys(state.finalStep).length > 0) {
  //     return state.finalStep;
  //   }
  //   return localStorage.getItem("finalStep")
  //     ? JSON.parse(localStorage.getItem("finalStep"))
  //     : {};
  // },
  getUserFromCache(state) {
    if (Object.keys(state.user).length > 0) {
      return state.user;
    }
    return localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {};
  },
  getProposal(state) {
    return state.proposal;
  },
};
