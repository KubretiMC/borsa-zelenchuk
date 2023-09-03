import React from 'react';
import Row from './Row';
import { FilterValues } from '../interfaces/interfaces';

interface FilterProps {
  filterValues: FilterValues;
  setFilterValues: (object: any) => void;
  stockFilters: {
    goods: string[];
    place: string[];
  };
}

const Filter: React.FC<FilterProps> = ({ filterValues, setFilterValues, stockFilters }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilterValues({
      ...filterValues,
      [name]: value,
    });
  };

  return (
    <div className="grid grid-cols-1 gap-4 mt-5">
      <Row
        label="Име"
        value="good"
        filterValues={filterValues}
        handleInputChange={handleInputChange}
        options={['Всички', ...stockFilters.goods]}
      />
      <Row
        label="Място"
        value="place"
        filterValues={filterValues}
        handleInputChange={handleInputChange}
        options={['Всички', ...stockFilters.place]}
      />
      <Row
        label="Цена мин"
        value="minCost"
        filterValues={filterValues}
        handleInputChange={handleInputChange}
      />
      <Row
        label="Цена макс"
        value="maxCost"
        filterValues={filterValues}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default Filter;
