export const stringToNumber = (str?: string) => {
  if (!str) return 0;

  const num = parseFloat(str.replace(",", "").replace("£", ""));

  if (isNaN(num)) return 0;

  return Math.round(num * 100) / 100;
};

export const calculateProjectedReturns = (
  initialInvestment: string,
  returnRate: number,
  chargesRate: number
) => {
  const initialInvestmentNumber = stringToNumber(initialInvestment);
  const returnRateDecimal = returnRate / 100;
  const chargesRateDecimal = chargesRate / 100;
  const amountAfterReturn = initialInvestmentNumber * (1 + returnRateDecimal);
  const chargesAmount = amountAfterReturn * chargesRateDecimal;
  const finalAmount = amountAfterReturn - chargesAmount;
  const finalAmountDecimal = Math.round(finalAmount * 100) / 100;

  return finalAmountDecimal;
};

export function toggleItem<T>(item: T) {
  return function (items: T[]): T[] {
    return items.includes(item)
      ? items.filter((c) => c !== item)
      : [...items, item];
  };
}

export const formatNumberAsCurrency = (
  value: number,
  locale = "en-GB",
  currency = "GBP"
) =>
  value.toLocaleString(locale, {
    style: "currency",
    currency,
  });

export const isValidNumber = (value: string) =>
  !(value && isNaN(parseFloat(value)));
