import type { FC } from "react";

import type { Fund } from "../types";
import { calculateProjectedReturns } from "../utils";

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
      {lumpSum && (
        <p>
          Projected return:
          {calculateProjectedReturns(
            lumpSum,
            fund.projectedReturn.likely,
            fund.charges
          )}
        </p>
      )}
      <input type="checkbox" checked={selected} onChange={onSelectFund} />
    </div>
  );
};

export default FundCard;
