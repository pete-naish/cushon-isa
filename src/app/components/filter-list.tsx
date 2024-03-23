import type { Dispatch, SetStateAction } from "react";

import { toggleItem } from "../utils";

interface FilterListProps<T> {
  label: string;
  filters: readonly T[];
  onChange: Dispatch<SetStateAction<T[]>>;
  isSelected: (filter: T) => boolean;
  allSelected: boolean;
}

function FilterList<T>({
  label,
  filters,
  onChange,
  isSelected,
  allSelected,
}: FilterListProps<T>) {
  return (
    <div>
      <label>{label}:</label>
      <button
        className={allSelected ? "text-primary" : ""}
        onClick={() => onChange([])}
      >
        All
      </button>
      {filters.map((filter) => {
        const toggleFilter = toggleItem(filter);
        return (
          <button
            key={filter?.toString()}
            className={isSelected(filter) ? "text-primary" : ""}
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
