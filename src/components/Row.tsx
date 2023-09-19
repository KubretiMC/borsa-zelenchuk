  import React from 'react';
  import { FilterValues, OfferValues } from '../interfaces/interfaces';

  interface RowProps {
    label: string;
    value: keyof FilterValues | keyof OfferValues | string | number;
    type?: 'select' | 'number' | 'label' | 'password';
    filterValues?: any;
    handleInputChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    options?: string[] | null;
    onClick?: () => void;
    labelClassName?: string;
  }

  const Row: React.FC<RowProps> = ({ label, value, filterValues, handleInputChange, options, type, onClick, labelClassName }) => {
    return (
      <div className="flex items-center input-select-wrapper" onClick={onClick}>
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
            <label className={`${labelClassName ? labelClassName : 'text-left flex ml-14'}`}>{value}</label>
          ) : (
            <input
              type={type}
              id={value as string}
              name={value as string}
              step="0.01"
              className="border p-2 rounded-md w-full input-select"
              placeholder={type === "number" ? "0.00" : ""}
              value={filterValues?.[value] ?? ''}
              onChange={handleInputChange}
            />
          )}
        </div>
      </div>
    );
  };

  export default Row;
