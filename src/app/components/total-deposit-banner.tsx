import type { FC } from "react";
import clsx from "clsx";

import { formatNumberAsCurrency } from "../utils";

interface TotalDepositBannerProps {
  remainingAllowance: number;
  totalDeposit: number;
  selectedFundCount: number;
  submitDisabled: boolean;
}

const TotalDepositBanner: FC<TotalDepositBannerProps> = ({
  remainingAllowance,
  totalDeposit,
  selectedFundCount,
  submitDisabled,
}) => {
  return (
    <section className="fixed bottom-0 w-full bg-slate-100">
      <div className="container mx-auto flex justify-between gap-x-4">
        <div className="flex gap-x-4 px-4 py-4">
          <div className="flex flex-col">
            <span className="text-gray-600 text-sm pb-1">
              Remaining ISA allowance
            </span>
            <span className={clsx({ "text-red-600": remainingAllowance < 0 })}>
              {formatNumberAsCurrency(remainingAllowance)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600 text-sm pb-1">
              Total deposit ({selectedFundCount} fund
              {selectedFundCount > 1 ? "s" : ""})
            </span>
            <span className={clsx({ "text-red-600": remainingAllowance < 0 })}>
              {formatNumberAsCurrency(totalDeposit)}
            </span>
          </div>
        </div>
        <button
          disabled={submitDisabled}
          className={clsx("text-white p-4 transition", {
            "bg-gray-400": submitDisabled,
            "bg-primary hover:bg-primary/75": !submitDisabled,
          })}
          onClick={() => alert("Thanks for checking out my code!")}
        >
          Go to payment &#x2794;
        </button>
      </div>
    </section>
  );
};

export default TotalDepositBanner;
