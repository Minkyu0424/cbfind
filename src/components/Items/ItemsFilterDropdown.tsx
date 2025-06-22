import React, { useState } from "react";
import type { FilterOption } from "../../types/items";

interface ItemsFilterDropdownProps {
  options: FilterOption[];
  onSelect: (selectedValue: string) => void;
  placeholder?: string;
}

const ItemsFilterDropdown = ({
  options,
  onSelect,
  placeholder = "검색 필터",
}: ItemsFilterDropdownProps) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <select
      className="text-xs border border-[var(--gray)] p-1 rounded-lg focus:outline-none bg-white text-[var(--sub)]"
      value={selectedValue}
      onChange={handleChange}
    >
      <option className="text-[var(--sub)]" value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default ItemsFilterDropdown;
