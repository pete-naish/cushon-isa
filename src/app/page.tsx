"use client";

import React, { useState, type ChangeEvent, useMemo, useCallback } from "react";

import { ANNUAL_ISA_LIMIT, MAX_SELECTED_FUNDS } from "./config";
import { stringToNumber } from "./utils";
import { useLocalStorage } from "./use-local-storage";
import {
  riskProfiles,
  type Category,
  type RiskProfile,
  type SelectedFund,
  categories,
  type Fund,
} from "./types";
import { funds } from "./data";

import FilterList from "./components/filter-list";
import FundList from "./components/fund-list";

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

  return (
    <div>
      <div className="w-full">
        <img
          className="w-36"
          src="data:image/png;base64,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"
        />
      </div>
      <h1 className="text-3xl font-bold underline text-primary">
        Cushon Stocks &amp; Shares ISA
      </h1>
      <h2>
        {MAX_SELECTED_FUNDS === 1
          ? "Select your fund"
          : `Select up to ${MAX_SELECTED_FUNDS} funds`}
      </h2>
      <p>Enter a value to see how each fund might perform over time</p>
      <input
        type="text"
        value={lumpSum}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setLumpSum(e.target.value)
        }
      />
      <FilterList
        label="Categories"
        filters={categories}
        onChange={setSelectedCategories}
        isSelected={(category) => selectedCategories.includes(category)}
        allSelected={!selectedCategories.length}
      />
      <FilterList
        label="Risk Appetite"
        filters={riskProfiles}
        onChange={setSelectedRiskProfiles}
        isSelected={(riskProfile) => selectedRiskProfiles.includes(riskProfile)}
        allSelected={!selectedRiskProfiles.length}
      />
      <FundList
        funds={fundsMatchingFilters}
        lumpSum={lumpSum}
        onSelectFund={(fund) => handleSelectFund(fund)}
        isSelected={(fund) =>
          Boolean(
            selectedFunds.find((selectedFund) => selectedFund.id === fund.id)
          )
        }
      />

      {/* DRAWER */}
      {enoughFundsSelected && <button>Next</button>}
      <section>
        {selectedFunds.map((fund) => {
          return (
            <div key={fund.id}>
              <h4>{fund.name}</h4>
              <input
                type="text"
                value={fund?.total || ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleFundTotalChange(fund.id, e.target.value)
                }
                // allow empty, but if entered letters, or above ANNUAL_ISA_LIMIT show error
              />
            </div>
          );
        })}
      </section>
      {/* go red when negative */}
      <div>
        Remaining ISA allowance (i) £
        {remainingAllowance.toLocaleString("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
      <div>
        Total deposit £
        {totalDeposit.toLocaleString("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
      {/* show if valid = remainingAllowance >=0 && totalDeposit > 100 */}
      <button>Go to payment &gt;</button>
    </div>
  );
}
