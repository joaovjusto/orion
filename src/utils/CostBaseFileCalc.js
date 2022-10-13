import store from "@/store";
import StringToDouble from "./common/StringToDouble";

export default (data) => {
  const variablesToCalc = { ...store.getters.getVehicleDataFromCache };
  let { fob, shipping } = data;

  fob = (StringToDouble(variablesToCalc.fob) * StringToDouble(variablesToCalc.currencyTax)).toFixed(2);
  shipping = (StringToDouble(variablesToCalc.shipping) * StringToDouble(variablesToCalc.currencyTax)).toFixed(2);

  return { ...data, fob, shipping };
};
