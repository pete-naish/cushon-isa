import type { Fund } from "./types";

export const funds: Fund[] = [
  {
    id: "18aade0e-22be-4791-a8f7-7abe901b3e60",
    name: "Cushon Crazy Fund",
    category: "Equities",
    riskProfile: "Very high",
    projectedReturn: {
      good: 21.76,
      likely: 10.2,
      bad: -15.52,
    },
    charges: 1.91,
    description:
      "This CushonMix portfolio spreads your money across a wild range of top-rated funds from our comparison tables.",
    provider: "Cushon",
  },
  {
    id: "18aade0e-22be-4791-a8f7-7f3e901b3or0",
    name: "Cushon Equities Fund",
    category: "Equities",
    riskProfile: "High",
    projectedReturn: {
      good: 18.26,
      likely: 8.12,
      bad: -1.32,
    },
    charges: 0.91,
    description:
      "This CushonMix portfolio spreads your money across a specially selected range of top-rated funds from our comparison tables.",
    provider: "Cushon",
  },
  {
    id: "ee657346-ba46-4f70-9936-b32171710342",
    name: "Cushon Bonds Fund",
    category: "Bonds",
    riskProfile: "Medium",
    projectedReturn: {
      good: 7.18,
      likely: 4.42,
      bad: -2.89,
    },
    charges: 1.01,
    description:
      "This CushonMix portfolio spreads your money across a specially selected range of top-rated funds from our comparison tables.",
    provider: "Cushon",
  },
  {
    id: "33e814c9-1198-4c0d-910b-05d9f87aecf0",
    name: "Cushon Ethical Fund",
    category: "Ethical",
    riskProfile: "Low",
    projectedReturn: {
      good: 6.76,
      likely: 5.2,
      bad: -1.01,
    },
    charges: 0.45,
    description:
      "This CushonMix portfolio spreads your money across a specially selected range of top-rated funds from our comparison tables.",
    provider: "Cushon",
  },
  {
    id: "33e814c9-1198-4c0d-910b-05fef87aecf0",
    name: "Cushon Ethical Fund",
    category: "Ethical",
    riskProfile: "Very low",
    projectedReturn: {
      good: 4.01,
      likely: 2.02,
      bad: 1.5,
    },
    charges: 0.22,
    description:
      "This CushonMix portfolio spreads your money across a specially selected range of top-rated funds from our comparison tables.",
    provider: "Cushon",
  },
];
