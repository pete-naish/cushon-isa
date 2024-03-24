export const categories = [
  "Ethical",
  "CushonMix",
  "Equities",
  "Bonds",
] as const;

export type Category = (typeof categories)[number];

export const riskProfiles = [
  "Very high",
  "High",
  "Medium",
  "Low",
  "Very low",
] as const;

export type RiskProfile = (typeof riskProfiles)[number];

export type ProjectedReturn = {
  good: number;
  likely: number;
  bad: number;
};

export type Fund = {
  id: string;
  name: string;
  category: Category;
  riskProfile: RiskProfile;
  projectedReturn: ProjectedReturn;
  charges: number;
  description: string;
  provider: string;
};

export type SelectedFund = Fund & {
  total?: string;
  isValid?: boolean;
};
