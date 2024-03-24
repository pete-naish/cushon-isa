import type { Dispatch, SetStateAction } from "react";
import clsx from "clsx";

import { toggleItem } from "../utils";

interface FilterListProps<T> {
  label: string;
  filters: readonly T[];
  onChange: Dispatch<SetStateAction<T[]>>;
  isSelected: (filter: T) => boolean;
  allSelected: boolean;
}

const activeClasses = "underline text-primary";

function FilterList<T>({
  label,
  filters,
  onChange,
  isSelected,
  allSelected,
}: FilterListProps<T>) {
  return (
    <div className="flex flex-row flex-wrap align-start gap-x-2 my-1">
      <span className="text-gray-400 font-semibold whitespace-nowrap">
        {label}:
      </span>
      <button
        className={clsx({
          "text-gray-600": !allSelected,
          [activeClasses]: allSelected,
        })}
        onClick={() => onChange([])}
      >
        All
      </button>
      {filters.map((filter) => {
        const toggleFilter = toggleItem(filter);
        return (
          <button
            key={filter?.toString()}
            className={clsx("whitespace-nowrap", {
              "text-gray-600": !isSelected(filter),
              [activeClasses]: isSelected(filter),
            })}
            onClick={() => onChange(toggleFilter)}
          >
            {filter?.toString()}
          </button>
        );
      })}
    </div>
  );
}

export default FilterList;
