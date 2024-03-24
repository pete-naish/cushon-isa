"use client";

import React, { useState, type ChangeEvent, useMemo, useCallback } from "react";
import clsx from "clsx";

import {
  ANNUAL_ISA_LIMIT,
  BRAND_LOGO,
  MAX_SELECTED_FUNDS,
  MIN_LUMP_SUM,
} from "./config";
import { formatNumberAsCurrency, isValidNumber, stringToNumber } from "./utils";
import { useLocalStorage } from "./use-local-storage";
import {
  categories,
  riskProfiles,
  type Category,
  type Fund,
  type RiskProfile,
  type SelectedFund,
} from "./types";
import { funds } from "./data";

import FilterList from "./components/filter-list";
import FundList from "./components/fund-list";
import CurrencyInput from "./components/currency-input";

export default function Page() {
  const [lumpSum, setLumpSum] = useState("");
  const [selectedFunds, setSelectedFunds] = useLocalStorage<SelectedFund[]>(
    "selectedFunds",
    []
  );
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedRiskProfiles, setSelectedRiskProfiles] = useState<
    RiskProfile[]
  >([]);

  const handleFundTotalChange = useCallback(
    (id: string, value: string) => {
      setSelectedFunds((selectedFunds) => {
        return selectedFunds.map((selectedFund) => {
          if (selectedFund.id !== id) return selectedFund;

          return {
            ...selectedFund,
            total: value,
          };
        });
      });
    },
    [setSelectedFunds]
  );

  const handleSelectFund = (fund: Fund) => {
    setSelectedFunds((selectedFunds) => {
      if (selectedFunds.find((selectedFund) => selectedFund.id === fund.id)) {
        return selectedFunds.filter(
          (selectedFund) => selectedFund.id !== fund.id
        );
      }

      if (MAX_SELECTED_FUNDS === 1) return [fund];

      if (selectedFunds.length >= MAX_SELECTED_FUNDS) return selectedFunds;

      return [...selectedFunds, fund];
    });
  };

  const selectedFundTotal = useMemo(() => {
    return selectedFunds.reduce((acc, curr) => {
      const total = stringToNumber(curr?.total); // just because I'm using localStorage for this scenario and it converts some values to null or loses decimals.

      return acc + total;
    }, 0);
  }, [selectedFunds]);

  const totalDeposit = selectedFundTotal;
  const remainingAllowance = ANNUAL_ISA_LIMIT - selectedFundTotal;

  const enoughFundsSelected = Boolean(
    selectedFunds.length && selectedFunds.length <= MAX_SELECTED_FUNDS
  );

  const fundsMatchingFilters = funds.filter((fund) => {
    const categoryMatch =
      !selectedCategories.length || selectedCategories.includes(fund.category);

    const riskProfileMatch =
      !selectedRiskProfiles.length ||
      selectedRiskProfiles.includes(fund.riskProfile);

    return categoryMatch && riskProfileMatch;
  });

  const submitDisabled =
    remainingAllowance < 0 ||
    totalDeposit < 100 ||
    !selectedFunds.every(
      (fund) =>
        fund.total &&
        isValidNumber(fund.total) &&
        stringToNumber(fund.total) >= MIN_LUMP_SUM &&
        stringToNumber(fund.total) <= ANNUAL_ISA_LIMIT
    );

  return (
    <>
      <header className="container mx-auto p-4">
        <img className="w-32" src={BRAND_LOGO} />
      </header>
      <section className="container mx-auto py-16 px-4 flex items-center flex-col">
        <h1 className="text-3xl font-bold text-primary text-center">
          Cushon Stocks &amp; Shares ISA
        </h1>
      </section>
      <div className="bg-slate-100">
        <section className="container mx-auto p-4 pb-2 flex items-start flex-col">
          <h2 className="self-center text-xl text-primary font-bold mb-2">
            {MAX_SELECTED_FUNDS === 1
              ? "Select your fund"
              : `Select up to ${MAX_SELECTED_FUNDS} funds`}
          </h2>
          <h3 className="self-center text-sm text-gray-400 mb-4">
            Showing {fundsMatchingFilters.length} of {funds.length}
          </h3>
          <FilterList
            label="Categories"
            filters={categories}
            onChange={setSelectedCategories}
            isSelected={(category) => selectedCategories.includes(category)}
            allSelected={!selectedCategories.length}
          />
          <FilterList
            label="Risk level"
            filters={riskProfiles}
            onChange={setSelectedRiskProfiles}
            isSelected={(riskProfile) =>
              selectedRiskProfiles.includes(riskProfile)
            }
            allSelected={!selectedRiskProfiles.length}
          />
        </section>
        <section className="container mx-auto flex flex-nowrap gap-x-4 overflow-x-auto p-4 overscroll-contain">
          <FundList
            funds={fundsMatchingFilters}
            lumpSum={lumpSum}
            onSelectFund={(fund) => handleSelectFund(fund)}
            isSelected={(fund) =>
              Boolean(
                selectedFunds.find(
                  (selectedFund) => selectedFund.id === fund.id
                )
              )
            }
            onClearFilters={() => {
              setSelectedCategories([]);
              setSelectedRiskProfiles([]);
            }}
          />
        </section>
        <section className="container mx-auto px-4 py-4">
          <CurrencyInput
            label={`Lump sum (mininum ${formatNumberAsCurrency(MIN_LUMP_SUM)})`}
            value={lumpSum}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLumpSum(e.target.value)
            }
            isValid={isValidNumber(lumpSum)}
            errorMessage={`Lump sum must be at least ${formatNumberAsCurrency(
              MIN_LUMP_SUM
            )}`}
            helperMessage="Enter a lump sum to see how each fund might perform over time"
          />
        </section>
      </div>
      {enoughFundsSelected && (
        <>
          <section className="container mx-auto p-4 mb-32">
            <h2 className="text-center text-xl text-primary font-bold mb-2">
              {`How much would you like to deposit into your fund${
                selectedFunds.length > 1 ? "s" : ""
              }?`}
            </h2>
            <h3 className="text-center text-sm text-gray-400 mb-4">
              Your total deposit must be between{" "}
              {formatNumberAsCurrency(MIN_LUMP_SUM)} and{" "}
              {formatNumberAsCurrency(ANNUAL_ISA_LIMIT)}
            </h3>
            {selectedFunds.map((fund) => {
              return (
                <div key={fund.id}>
                  <h4>{fund.name}</h4>
                  <CurrencyInput
                    value={fund?.total || ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleFundTotalChange(fund.id, e.target.value)
                    }
                    isValid={
                      !fund?.total ||
                      (isValidNumber(fund.total) &&
                        stringToNumber(fund.total) >= MIN_LUMP_SUM &&
                        stringToNumber(fund.total) <= ANNUAL_ISA_LIMIT &&
                        totalDeposit <= ANNUAL_ISA_LIMIT)
                    }
                    errorMessage={`Total deposit amount must be a number between ${formatNumberAsCurrency(
                      MIN_LUMP_SUM
                    )} and ${formatNumberAsCurrency(ANNUAL_ISA_LIMIT)}`}
                  />
                  {/* remove fund button */}
                </div>
              );
            })}
          </section>
          <section className="fixed bottom-0 w-full bg-slate-100">
            <div className="container mx-auto flex justify-between gap-x-4">
              <div className="flex gap-x-4 px-4 py-1">
                <div className="flex flex-col">
                  <span className="text-gray-600 text-sm">
                    Remaining ISA allowance (i)
                  </span>
                  <span
                    className={clsx({ "text-red-600": remainingAllowance < 0 })}
                  >
                    {formatNumberAsCurrency(remainingAllowance)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-600 text-sm">
                    Total deposit ({selectedFunds.length} fund
                    {selectedFunds.length > 1 ? "s" : ""})
                  </span>
                  <span
                    className={clsx({ "text-red-600": remainingAllowance < 0 })}
                  >
                    {formatNumberAsCurrency(totalDeposit)}
                  </span>
                </div>
              </div>
              <button
                disabled={submitDisabled}
                className={clsx("text-white p-4 transition", {
                  "bg-gray-400": submitDisabled,
                  "bg-primary": !submitDisabled,
                })}
                onClick={() => alert("All done for now!")}
              >
                Go to payment &#x2794;
              </button>
            </div>
          </section>
        </>
      )}
    </>
  );
}
