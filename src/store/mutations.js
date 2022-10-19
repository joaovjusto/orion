import CostBaseFileCalc from "@/utils/CostBaseFileCalc";
import TributeBaseFileCalc from "@/utils/TributeBaseFileCalc";

export default {
  SET_VEHICLE_DATA(state, newValue) {
    state.vehicleData = newValue;
  },
  SET_COST_DATA(state, newValue) {
    state.costData = CostBaseFileCalc(newValue);
  },
  SET_TRIBUTE_DATA(state, newValue) {
    state.tributeData = TributeBaseFileCalc(newValue);
  },
  SET_CREDIT_DATA(state, newValue) {
    state.creditData = newValue;
  },
  SET_IMPORT_DATA(state, newValue) {
    state.importData = newValue;
  },
  SET_FINAL_STEP(state, newValue) {
    state.finalStep = newValue;
  },
  SET_CURRENCY(state, currency) {
    state.currency = currency;
  },
  SET_STEPS_RENDERED(state, stepsRendered) {
    state.stepsRendered = stepsRendered;
  },
};
