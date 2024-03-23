export const stringToNumber = (str?: string) => {
  if (!str) return 0;

  const num = parseFloat(str);

  if (isNaN(num)) return 0;

  return Math.round(num * 100) / 100;
};

export const calculateProjectedReturns = (
  initialInvestment: number,
  returnRate: number,
  chargesRate: number
) => {
  const returnRateDecimal = returnRate / 100;
  const chargesRateDecimal = chargesRate / 100;
  const amountAfterReturn = initialInvestment * (1 + returnRateDecimal);
  const chargesAmount = amountAfterReturn * chargesRateDecimal;
  const finalAmount = amountAfterReturn - chargesAmount;

  return Math.round(finalAmount);
};

export function toggleItem<T>(item: T) {
  return function (items: T[]): T[] {
    return items.includes(item)
      ? items.filter((c) => c !== item)
      : [...items, item];
  };
}
