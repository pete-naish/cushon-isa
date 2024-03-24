import type { FC } from "react";
import clsx from "clsx";

import type { RiskProfile } from "../types";

interface RiskProfileBadgeProps {
  riskProfile: RiskProfile;
}

const RiskProfileBadge: FC<RiskProfileBadgeProps> = ({ riskProfile }) => {
  return (
    <span
      className={clsx("text-xs py-px px-1 rounded", {
        "bg-yellow-300 text-yellow-700": riskProfile === "Very low",
        "bg-sky-200 text-sky-900": riskProfile === "Low",
        "bg-orange-600 text-orange-100": riskProfile === "Medium",
        "bg-purple-900 text-purple-200": riskProfile === "High",
        "bg-sky-900 text-sky-200": riskProfile === "Very high",
      })}
    >
      {riskProfile} risk
    </span>
  );
};

export default RiskProfileBadge;
