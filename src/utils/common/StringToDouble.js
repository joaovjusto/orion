export default (value) => {
  if (typeof value === 'string') {
    const parsedValue = value.replace(",", ".");
    if (parsedValue.replace(/[^.]/g, "").length > 1) {
      return Number(
        value.replaceAll(".", "").replace(',', '.').replace(/[^0-9.-]+/g, "")
      ).toFixed(2);
    }
    return Number(parsedValue.replace(/[^0-9.-]+/g, "")).toFixed(2);
  }
  if (!value) {
    return 0;
  }
  return value;
};
