import React from 'react';
import { FilterValues, OfferValues } from '../interfaces/interfaces';

interface RowProps {
  label: string;
  value: keyof FilterValues | keyof OfferValues | string | number;
  type?: 'select' | 'inputNumber' | 'label';
  filterValues?: any;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  options?: string[] | null;
}

const Row: React.FC<RowProps> = ({ label, value, filterValues, handleInputChange, options, type }) => {
  return (
    <div className="flex items-center input-select-wrapper">
      <label className="mr-6 w-20 text-left">
        {label}
      </label>
      <div className={`flex-1`}>
        {type === 'select' ? (
          <select
            id={value as string}
            name={value as string}
            className="border p-2 rounded-md w-full input-select"
            value={filterValues?.[value] ?? ''}
            onChange={handleInputChange}
          >
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : type === 'label' ? (
          <label className='text-left flex ml-14'>{value}</label>
        ) : (
          <input
            type={type === "inputNumber" ? "number" : "text"}
            id={value as string}
            name={value as string}
            step="0.01"
            className="border p-2 rounded-md w-full input-select"
            placeholder={type === "inputNumber" ? "0.00" : ""}
            value={filterValues?.[value] ?? ''}
            onChange={handleInputChange}
          />
        )}
      </div>
    </div>
  );
};

export default Row;
