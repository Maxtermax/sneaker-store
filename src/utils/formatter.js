export function formatNumberToCurrency(number = 0) {
  const formatter = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  });
  return formatter.format(number);
}
export const s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

export const formatDate = (date) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    hour12: false,
  });
  return formatter.format(date);
};
