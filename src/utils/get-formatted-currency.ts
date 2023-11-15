export const getFormattedCurrency = (currency: number | string) => {
  if (typeof currency === "string") {
    return Number(currency).toLocaleString();
  }

  return currency.toLocaleString();
};
