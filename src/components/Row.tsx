import React from 'react';
import { FilterValues } from '../interfaces/interfaces';

interface RowProps {
  label: string;
  value: keyof FilterValues | string | number;
  type: 'select' | 'input' | 'label';
  filterValues?: FilterValues;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  options?: string[] | null;
}

const Row: React.FC<RowProps> = ({ label, value, filterValues, handleInputChange, options, type }) => {
  return (
    <div className="flex items-center input-select-wrapper">
      <label className="mr-2 w-20 text-left">
        {label}
      </label>
      <div className={`flex-1`}>
        {type === 'select' ? (
          <select
            id={value as string}
            name={value as string}
            className="border p-2 rounded-md w-full input-select"
            value={filterValues?.[value as keyof FilterValues] ?? ''}
            onChange={handleInputChange}
          >
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : type === 'input' ? (
          <input
            type="number"
            id={value as string}
            name={value as string}
            step="0.01"
            className="border p-2 rounded-md w-full input-select"
            placeholder="0.00"
            value={filterValues?.[value as keyof FilterValues] ?? ''}
            onChange={handleInputChange}
          />
        ) : (
          <label className='text-left flex ml-14'>{value}</label>
        )}
      </div>
    </div>
  );
};

export default Row;
