import React from 'react';
import { FilterValues } from '../interfaces/interfaces';

interface RowProps {
  label: string;
  value: keyof FilterValues;
  filterValues: FilterValues;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  options?: string[];
}

const Row: React.FC<RowProps> = ({ label, value, filterValues, handleInputChange, options }) => {
  return (
    <div className="flex items-center input-select-wrapper">
      <label htmlFor={value} className="mr-2 w-20 text-left">
        {label}
      </label>
      <div className={`flex-1`}>
        {options ? (
          <select
            id={value}
            name={value}
            className="border p-2 rounded-md w-full input-select"
            value={filterValues[value] as string}
            onChange={handleInputChange}
          >
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="number"
            id={value}
            name={value}
            step="0.01"
            className="border p-2 rounded-md w-full input-select"
            placeholder="0.00"
            value={filterValues[value]}
            onChange={handleInputChange}
          />
        )}
      </div>
    </div>
  );
};

export default Row;
