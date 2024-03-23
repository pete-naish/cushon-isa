import type { FC } from "react";

import type { Fund } from "../types";
import FundCard from "./fund-card";

interface FundListProps {
  funds: Fund[];
  lumpSum: string;
  isSelected: (fund: Fund) => boolean;
  onSelectFund: (fund: Fund) => void;
}

const FundList: FC<FundListProps> = ({
  funds,
  lumpSum,
  isSelected,
  onSelectFund,
}) => {
  return funds.map((fund) => {
    return (
      <FundCard
        key={fund.id}
        fund={fund}
        lumpSum={lumpSum}
        selected={isSelected(fund)}
        onSelectFund={() => onSelectFund(fund)}
      />
    );
  });
};

export default FundList;
