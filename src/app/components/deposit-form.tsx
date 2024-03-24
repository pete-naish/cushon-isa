import type { FC } from "react";

import { FORMATTED_ANNUAL_ISA_LIMIT, FORMATTED_MIN_LUMP_SUM } from "../config";
import type { SelectedFund } from "../types";
import FundRow from "./fund-row";

interface DepositFormProps {
  selectedFunds: SelectedFund[];
  onRemoveSelectedFund: (id: string) => void;
  onFundTotalChange: (id: string, value: string) => void;
}

const DepositForm: FC<DepositFormProps> = ({
  selectedFunds,
  onRemoveSelectedFund,
  onFundTotalChange,
}) => {
  return (
    <section className="container mx-auto px-4 pt-16 pb-32">
      <h2 className="text-xl text-primary font-bold mb-2">
        How much would you like to deposit?
      </h2>
      <h3 className="text-sm text-gray-600 mb-4">
        Your total deposit must be between {FORMATTED_MIN_LUMP_SUM} and{" "}
        {FORMATTED_ANNUAL_ISA_LIMIT}
      </h3>
      <div className="flex flex-col">
        {selectedFunds.map((fund, i) => {
          return (
            <FundRow
              key={fund.id}
              fund={fund}
              isOdd={i % 2 !== 0}
              onRemoveSelectedFund={onRemoveSelectedFund}
              onFundTotalChange={onFundTotalChange}
            />
          );
        })}
      </div>
    </section>
  );
};

export default DepositForm;
