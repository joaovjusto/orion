import store from "@/store";

export default (data) => {
  const stepRendered = store.getters.getStepsRendered.find(
    (step) => step.name === "VehicleData"
  );

  let baseDataRender = {};
  if (stepRendered) {
    if (stepRendered.count === 0) {
      baseDataRender = {
        importer: "VERSAILLES",
        billing: "SP",
        modal: "MARÍTIMO",
        cargoType: "CTN",
        purchaser: "PJ",
        fob: "51.095,00",
        shipping: "875,00",
        cntr: "1",
        origin: "USA",
        destination: "Santa Catarina",
        icmsDestination: "4%",
        ncm: "8703",
      };
    }
  }

  return { ...data, ...baseDataRender };
};
