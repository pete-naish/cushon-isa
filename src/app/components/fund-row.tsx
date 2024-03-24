import type { ChangeEvent, FC } from "react";
import clsx from "clsx";

import type { SelectedFund } from "../types";
import { FORMATTED_ANNUAL_ISA_LIMIT, FORMATTED_MIN_LUMP_SUM } from "../config";
import CurrencyInput from "./currency-input";

interface FundRowProps {
  fund: SelectedFund;
  isOdd: boolean;
  onRemoveSelectedFund: (id: string) => void;
  onFundTotalChange: (id: string, value: string) => void;
}

const FundRow: FC<FundRowProps> = ({
  fund,
  isOdd,
  onRemoveSelectedFund,
  onFundTotalChange,
}) => {
  return (
    <div
      key={fund.id}
      className={clsx("flex items-center justify-between gap-x-4 px-4 py-2", {
        "bg-slate-100": isOdd,
      })}
    >
      <button className="w-4" onClick={() => onRemoveSelectedFund(fund.id)}>
        <img className="w-4 max-w-none" src="/delete.png" />
      </button>
      <h4 className="w-60" data-testid="fund-row">
        {fund.name}
      </h4>
      <div className="flex-1">
        <CurrencyInput
          value={fund?.total || ""}
          testId="fund-row-deposit-input"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onFundTotalChange(fund.id, e.target.value)
          }
          isValid={Boolean(!fund?.total || fund.isValid)}
          errorMessage={`Total deposit must be between ${FORMATTED_MIN_LUMP_SUM} and ${FORMATTED_ANNUAL_ISA_LIMIT}`}
        />
      </div>
      <a href="#" className="flex justify-end underline">
        Download {fund.name} KIID
      </a>
    </div>
  );
};

export default FundRow;
