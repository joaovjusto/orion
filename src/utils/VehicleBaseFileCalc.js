import store from "@/store";

export default (data) => {
  const vehicleFormData = { ...store.getters.getVehicleDataFromCache };
  const stepRendered = store.getters.getStepsRendered.find(
    (step) => step.name === "VehicleData"
  );

  let baseDataRender = {};
  if (stepRendered) {
    if (stepRendered.count === 0 && !Object.keys(vehicleFormData).includes('importer')) {
      baseDataRender = {
        importer: "LUXOR",
        modifier: "0.05%",
        billing: "SP",
        modal: "MARÍTIMO",
        cargoType: "CTN",
        purchaser: "PJ",
        fob: "25.000,00",
        shipping: "2000.00,00",
        cntr: "1",
        origin: "USA",
        destination: "Santa Catarina",
        icmsDestination: "12%",
        ncm: "8703",
      };
    }
  }

  return { ...data, ...baseDataRender };
};
