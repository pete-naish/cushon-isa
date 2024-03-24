"use client";

import React, { useState, type ChangeEvent, useMemo, useCallback } from "react";

import {
  ANNUAL_ISA_LIMIT,
  FORMATTED_MIN_LUMP_SUM,
  MAX_SELECTED_FUNDS,
  MIN_LUMP_SUM,
} from "./config";
import { isValidNumber, stringToNumber } from "./utils";
import { useLocalStorage } from "./use-local-storage";
import {
  categories,
  riskProfiles,
  type Category,
  type RiskProfile,
  type SelectedFund,
  type Fund,
} from "./types";
import { funds } from "./data";

import FilterList from "./components/filter-list";
import FundList from "./components/fund-list";
import CurrencyInput from "./components/currency-input";
import TotalDepositBanner from "./components/total-deposit-banner";
import DepositForm from "./components/deposit-form";

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
            isValid:
              isValidNumber(value) &&
              stringToNumber(value) >= MIN_LUMP_SUM &&
              stringToNumber(value) <= ANNUAL_ISA_LIMIT,
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

  const totalDeposit = selectedFundTotal;
  const remainingAllowance = ANNUAL_ISA_LIMIT - selectedFundTotal;

  const submitDisabled =
    remainingAllowance < 0 ||
    totalDeposit < 100 ||
    !selectedFunds.every(({ isValid }) => isValid);

  return (
    <>
      <section className="container mx-auto py-16 px-4 flex items-center flex-col">
        <h1 className="text-3xl font-bold text-primary text-center">
          Cushon Stocks &amp; Shares ISA
        </h1>
      </section>
      <div className="bg-slate-100">
        <section className="container mx-auto px-4 pb-2 pt-16 flex items-start flex-col">
          <h2 className="text-xl text-primary font-bold mb-2">
            {MAX_SELECTED_FUNDS === 1
              ? "Select your fund"
              : `Select up to ${MAX_SELECTED_FUNDS} funds`}
          </h2>
          <h3 className="text-sm text-gray-600 mb-4">
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
        <section className="container mx-auto flex flex-nowrap gap-x-4 p-4 overflow-x-auto overscroll-contain md:gap-4 md:flex-wrap">
          <FundList
            funds={fundsMatchingFilters}
            lumpSum={lumpSum}
            onSelectFund={(fund) => handleSelectFund(fund)}
            onClearFilters={() => {
              setSelectedCategories([]);
              setSelectedRiskProfiles([]);
            }}
            isSelected={(fund) =>
              Boolean(
                selectedFunds.find(
                  (selectedFund) => selectedFund.id === fund.id
                )
              )
            }
          />
        </section>
        <section className="container mx-auto px-4 pt-4 pb-16">
          <CurrencyInput
            label={`Lump sum (mininum ${FORMATTED_MIN_LUMP_SUM})`}
            value={lumpSum}
            isValid={isValidNumber(lumpSum)}
            errorMessage={`Lump sum must be at least ${FORMATTED_MIN_LUMP_SUM}`}
            helperMessage="Enter a lump sum to see how each fund might perform over time"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLumpSum(e.target.value)
            }
          />
        </section>
      </div>
      {enoughFundsSelected && (
        <>
          <DepositForm
            selectedFunds={selectedFunds}
            onFundTotalChange={handleFundTotalChange}
            onRemoveSelectedFund={(id: string) =>
              setSelectedFunds((selectedFunds) =>
                selectedFunds.filter((selectedFund) => selectedFund.id !== id)
              )
            }
          />
          <TotalDepositBanner
            remainingAllowance={remainingAllowance}
            totalDeposit={totalDeposit}
            selectedFundCount={selectedFunds.length}
            submitDisabled={submitDisabled}
          />
        </>
      )}
    </>
  );
}
