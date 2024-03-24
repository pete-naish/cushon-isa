import type { Fund } from "./types";

export const funds: Fund[] = [
  {
    id: "18aade0e-22be-4791-a8f7-7abe901b3e60",
    name: "Cushon Crazy fund",
    category: "Equities",
    riskProfile: "Very high",
    projectedReturn: {
      good: 21.76,
      likely: 6.12,
      bad: -9.52,
    },
    charges: 0.91,
    description: "Hello",
    provider: "Cushon",
  },
  {
    id: "18aade0e-22be-4791-a8f7-7f3e901b3or0",
    name: "Cushon Equities fund",
    category: "Equities",
    riskProfile: "High",
    projectedReturn: {
      good: 21.76,
      likely: 6.12,
      bad: -9.52,
    },
    charges: 0.91,
    description: "Hello",
    provider: "Cushon",
  },
  {
    id: "ee657346-ba46-4f70-9936-b32171710342",
    name: "Cushon Bonds fund",
    category: "Bonds",
    riskProfile: "Medium",
    projectedReturn: {
      good: 21.76,
      likely: 6.12,
      bad: -9.52,
    },
    charges: 0.91,
    description: "Hello",
    provider: "Cushon",
  },
  {
    id: "33e814c9-1198-4c0d-910b-05d9f87aecf0",
    name: "Cushon Ethical fund",
    category: "Ethical",
    riskProfile: "Low",
    projectedReturn: {
      good: 21.76, // @TODO change these values
      likely: 6.12,
      bad: -9.52,
    },
    charges: 0.91,
    description: "Hello",
    provider: "Cushon",
  },
  {
    id: "33e814c9-1198-4c0d-910b-05fef87aecf0",
    name: "Cushon Ethical fund",
    category: "Ethical",
    riskProfile: "Very low",
    projectedReturn: {
      good: 21.76, // @TODO change these values
      likely: 6.12,
      bad: -9.52,
    },
    charges: 0.91,
    description: "Hello",
    provider: "Cushon",
  },
];
