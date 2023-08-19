export default (percent, total) => {
  return ((percent / 100) * total).toFixed(2);
};
