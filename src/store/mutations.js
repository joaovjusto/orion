export default {
  SET_VEHICLE_DATA(state, newValue) {
    state.vehicleData = newValue;
  },
  SET_COST_DATA(state, newValue) {
    state.costData = newValue;
  },
  SET_TRIBUTE_DATA(state, newValue) {
    state.tributeData = newValue;
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
};
