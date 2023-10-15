import React from 'react';
import Row from './Row';
import { FilterValues } from '../interfaces/interfaces';
import { useTranslation } from 'react-i18next';

interface FilterProps {
  filterValues: FilterValues;
  setFilterValues: (filterValues: FilterValues) => void;
  productFilters: {
    names: string[];
    places: string[];
  };
}

const Filter: React.FC<FilterProps> = ({ filterValues, setFilterValues, productFilters }) => {
  const { t } = useTranslation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilterValues({
      ...filterValues,
      [name]: value !== '' ? value : undefined,
    });
  };

  const translatedNames = productFilters.names.map(name => t(name));
  const translatedPlaces = productFilters.places.map(place => t(place));

  return (
    <div className="grid grid-cols-1 gap-4 mt-5">
      <Row
        label={t('NAME')}
        value="name"
        filterValues={filterValues}
        handleInputChange={handleInputChange}
        options={[t('ALL'), ...translatedNames]}
        type={'select'}
      />
      <Row
        label={t('PLACE')}
        value="place"
        filterValues={filterValues}
        handleInputChange={handleInputChange}
        options={[t('ALL'), ...translatedPlaces]}
        type={'select'}
      />
      <Row
        label={t('MIN_COST')}
        value="minCost"
        filterValues={filterValues}
        handleInputChange={handleInputChange}
        type={'number'}
      />
      <Row
        label={t('MAX_COST')}
        value="maxCost"
        filterValues={filterValues}
        handleInputChange={handleInputChange}
        type={'number'}
      />
    </div>
  );
};

export default Filter;
