import VehicleBaseFileCalc from "@/utils/VehicleBaseFileCalc";
import CostBaseFileCalc from "@/utils/CostBaseFileCalc";
import TributeBaseFileCalc from "@/utils/TributeBaseFileCalc";
import ImportDataBaseFileCalc from "@/utils/ImportDataBaseFileCalc";
import FinalStepBaseFileCalc from "@/utils/FinalStepBaseFileCalc";
import ResumeDataBaseFileCalc from "@/utils/ResumeDataBaseFileCalc";

export default {
  SET_VIDEO_DATA(state, newValue) {
    state.videoData = newValue;
  },
  SET_DESCRIPTION_DATA(state, newValue) {
    state.descriptionData = newValue;
  },
  SET_LOADING(state, newValue) {
    state.loading = newValue;
  },
  SET_VEHICLE_DATA(state, newValue) {
    state.vehicleData = VehicleBaseFileCalc(newValue);
  },
  SET_IMAGES_CAR_TEMPLATE(state, newValue) {
    state.imagesCarTemplate.push(newValue);
  },
  SET_COST_DATA(state, newValue) {
    state.costData = CostBaseFileCalc(newValue);
  },
  SET_TRIBUTE_DATA(state, newValue) {
    state.tributeData = TributeBaseFileCalc(newValue);
  },
  SET_IMPORT_DATA(state, newValue) {
    state.importData = ImportDataBaseFileCalc(newValue);
  },
  SET_FINAL_STEP(state, newValue) {
    state.finalStep = FinalStepBaseFileCalc(newValue);
  },
  SET_RESUME_DATA(state, newValue) {
    state.resumeData = ResumeDataBaseFileCalc(newValue);
  },
  SET_CURRENCY(state, currency) {
    state.currency = currency;
  },
  SET_STEPS_RENDERED(state, stepsRendered) {
    state.stepsRendered = stepsRendered;
  },
  SET_USER(state, user) {
    state.user = user;
  },
};
