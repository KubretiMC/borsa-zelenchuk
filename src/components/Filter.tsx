import React from 'react';
import Row from './Row';
import { FilterValues } from '../interfaces/interfaces';
import { ALL, MAX_COST, MIN_COST, NAME, PLACE } from '../constants/constants';

interface FilterProps {
  filterValues: FilterValues;
  setFilterValues: (filterValues: FilterValues) => void;
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
      [name]: value !== '' ? value : undefined,
    });
  };

  return (
    <div className="grid grid-cols-1 gap-4 mt-5">
      <Row
        label={NAME}
        value="name"
        filterValues={filterValues}
        handleInputChange={handleInputChange}
        options={[ALL, ...productFilters.names]}
        type={'select'}
      />
      <Row
        label={PLACE}
        value="place"
        filterValues={filterValues}
        handleInputChange={handleInputChange}
        options={[ALL, ...productFilters.places]}
        type={'select'}
      />
      <Row
        label={MIN_COST}
        value="minCost"
        filterValues={filterValues}
        handleInputChange={handleInputChange}
        type={'number'}
      />
      <Row
        label={MAX_COST}
        value="maxCost"
        filterValues={filterValues}
        handleInputChange={handleInputChange}
        type={'number'}
      />
    </div>
  );
};

export default Filter;
