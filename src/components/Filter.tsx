import React from 'react';
import Row from './Row';
import { FilterValues } from '../interfaces/interfaces';

interface FilterProps {
  stocksList: any[];
  filterValues: FilterValues;
  setFilterValues: (object: any) => void;
}

const Filter: React.FC<FilterProps> = ({ stocksList, filterValues, setFilterValues }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilterValues({
      ...filterValues,
      [name]: value,
    });
  };

  return (
    <div className="grid grid-cols-1 gap-4 mt-5">
      <Row label='Име' value='good' filterValues={filterValues} handleInputChange={handleInputChange} stocksList={stocksList} select={true}  />
      <Row label='Място' value='place' filterValues={filterValues} handleInputChange={handleInputChange} stocksList={stocksList} select={true} />
      <Row label='Цена мин' value='minCost' filterValues={filterValues} handleInputChange={handleInputChange} stocksList={stocksList} />
      <Row label='Цена макс' value='maxCost' filterValues={filterValues} handleInputChange={handleInputChange} stocksList={stocksList} />
    </div>
  );
};

export default Filter;
