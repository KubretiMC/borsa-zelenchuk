import React from 'react';

interface RowProps {
  label: string;
  value: string;
  filterValues: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  stocksList: any[];
  select?: boolean;
}

const Row: React.FC<RowProps> = ({ label, value, filterValues, handleInputChange, stocksList, select }) => {
  return (
    <div className="flex items-center input-select-wrapper">
      <label htmlFor={value} className="mr-2 w-20 text-left">
        {label}
      </label>
      <div className={`flex-1`}>
        {select ? (
          <select
            id={value}
            name={value}
            className="border p-2 rounded-md w-full input-select"
            value={filterValues[value] as string}
            onChange={handleInputChange}
          >
            <option value="all">Всички</option>
            {stocksList.map((stock: any) => (
              <option key={stock.id} value={stock[value]}>
                {stock[value]}
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
