export function formatNumberToCurrency(number = 0) {
  const formatter = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 });
  return formatter.format(number);
} 
