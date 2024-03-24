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
      <header className="flex justify-between items-center">
        <h3 className="font-bold">{fund.name}</h3>
        <label className="flex items-center gap-x-2 text-gray-400 text-xs">
          <span>Select</span>
          <input
            className="scale-125"
            type="checkbox"
            checked={selected}
            onChange={onSelectFund}
          />
        </label>
      </header>
      <RiskProfileBadge riskProfile={fund.riskProfile} />
      <div className="flex flex-col my-5">
        <span className="text-gray-600 text-sm mr-1">Projected return</span>

        {stringToNumber(lumpSum) >= MIN_LUMP_SUM ? (
          <span>
            {formatNumberAsCurrency(
              calculateProjectedReturns(
                lumpSum,
                fund.projectedReturn.likely,
                fund.charges
              )
            )}
          </span>
        ) : (
          <span className="italic">Unknown - update Lump sum below</span>
        )}
      </div>
      <a href="#" className="underline text-sm">
        Learn more
      </a>
    </div>
  );
};

export default FundCard;
