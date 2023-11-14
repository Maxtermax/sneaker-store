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

export const formatDate = (now) => {
  const tz = "en-US";
  const dateOptions = {
    day: "2-digit",
    year: "numeric",
    month: "short",
  };
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const date = Intl.DateTimeFormat(tz, dateOptions).format(now);
  const time = Intl.DateTimeFormat(tz, timeOptions).format(now);
  return `${date} at ${time}`;
};
