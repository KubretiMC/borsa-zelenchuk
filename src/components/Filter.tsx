import React from 'react';
import Row from './Row';
import { FilterValues } from '../interfaces/interfaces';

interface FilterProps {
  filterValues: FilterValues;
  setFilterValues: (object: any) => void;
  productFilters: {
    names: string[];
    places: string[];
  };
}

const Filter: React.FC<FilterProps> = ({ filterValues, setFilterValues, productFilters }) => {
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
        value="name"
        filterValues={filterValues}
        handleInputChange={handleInputChange}
        options={['Всички', ...productFilters.names]}
        type={'select'}
      />
      <Row
        label="Място"
        value="place"
        filterValues={filterValues}
        handleInputChange={handleInputChange}
        options={['Всички', ...productFilters.places]}
        type={'select'}
      />
      <Row
        label="Цена мин"
        value="minCost"
        filterValues={filterValues}
        handleInputChange={handleInputChange}
        type={'number'}
      />
      <Row
        label="Цена макс"
        value="maxCost"
        filterValues={filterValues}
        handleInputChange={handleInputChange}
        type={'number'}
      />
    </div>
  );
};

export default Filter;
