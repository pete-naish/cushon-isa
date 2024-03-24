import type { FC } from "react";

import type { Fund } from "../types";
import FundCard from "./fund-card";

interface FundListProps {
  funds: Fund[];
  lumpSum: string;
  isSelected: (fund: Fund) => boolean;
  onSelectFund: (fund: Fund) => void;
  onClearFilters: () => void;
}

const FundList: FC<FundListProps> = ({
  funds,
  lumpSum,
  isSelected,
  onSelectFund,
  onClearFilters,
}) => {
  if (!funds.length) {
    // TODO
    return (
      <>
        <p>No funds match your selected filters</p>
        <button onClick={onClearFilters}>Clear filters</button>
      </>
    );
  }

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
