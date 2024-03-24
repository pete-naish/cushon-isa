import type { FC } from "react";
import clsx from "clsx";

import type { Fund } from "../types";
import {
  calculateProjectedReturns,
  formatNumberAsCurrency,
  stringToNumber,
} from "../utils";
import { MIN_LUMP_SUM } from "../config";
import RiskProfileBadge from "./risk-profile-badge";

interface FundCardProps {
  fund: Fund;
  lumpSum: string;
  selected: boolean;
  onSelectFund: () => void;
}

const FundCard: FC<FundCardProps> = ({
  fund,
  lumpSum,
  selected,
  onSelectFund,
}) => {
  return (
    <div
      className={clsx(
        "w-80 border-solid border-2 rounded p-4 flex-shrink-0 transition bg-white",
        {
          "border-primary shadow-sm shadow-primary": selected,
        }
      )}
    >
      <header className="flex justify-between items-start">
        <h3 className="font-bold">{fund.name}</h3>
        <input
          className="m-1 scale-125"
          type="checkbox"
          checked={selected}
          onChange={onSelectFund}
        />
      </header>
      <RiskProfileBadge riskProfile={fund.riskProfile} />
      {stringToNumber(lumpSum) >= MIN_LUMP_SUM ? (
        <p>
          Projected return:
          {formatNumberAsCurrency(
            calculateProjectedReturns(
              lumpSum,
              fund.projectedReturn.likely,
              fund.charges
            )
          )}
        </p>
      ) : (
        <p>What to put here?</p>
      )}
      <button>Learn more</button>
    </div>
  );
};

export default FundCard;
