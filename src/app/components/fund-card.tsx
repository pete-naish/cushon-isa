import type { FC } from "react";

import type { Fund } from "../types";
import { calculateProjectedReturns, stringToNumber } from "../utils";
import { MIN_LUMP_SUM } from "../config";

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
    <div>
      <h3>{fund.name}</h3>

      <button onClick={onSelectFund}>Learn more</button>
      {stringToNumber(lumpSum) > MIN_LUMP_SUM ? (
        <p>
          Projected return:
          {calculateProjectedReturns(
            lumpSum,
            fund.projectedReturn.likely,
            fund.charges
          )}
        </p>
      ) : (
        <p>Enter a value to see how each fund might perform over time</p>
      )}
      <input type="checkbox" checked={selected} onChange={onSelectFund} />
    </div>
  );
};

export default FundCard;
