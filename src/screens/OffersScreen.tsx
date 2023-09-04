import React, { useState } from 'react';
import ScreenContainer from '../components/ScreenContainer';
import Offer from '../components/Offer';
import Filter from '../components/Filter';
import { FilterValues, Product } from '../interfaces/interfaces';
import { useSelector } from 'react-redux';

const OffersScreen: React.FC = () => {
    const products = useSelector((state: any) => state.products);
    const productFilters = useSelector((state: any) => state.productFilters);
    // const state = useSelector((state:any) => state);
    // console.log('state', state);
    const initialFilterValues: FilterValues = {
        name: 'Всички',
        place: 'Всички',
        minCost: 0,
        maxCost: 9999.99,
    };

    const [filterValues, setFilterValues] = useState(initialFilterValues);

    const filteredProductsList = products.filter((product: Product) => {
        const { name, place, minCost, maxCost } = filterValues;

        const nameMatch = name === 'Всички' || product.name === name;
        const placeMatch = place === 'Всички' || product.place === place;
        const costMatch = (minCost <= product.cost && maxCost >= product.cost) || (minCost === 0 && maxCost === 0);

        return nameMatch && placeMatch && costMatch;
    });

    const offerList = filteredProductsList.map((product: Product) => (
        <Offer key={product.id} name={product.name} place={product.place} cost={product.cost} image={product.image} />
    ));

    return (
        <ScreenContainer subtitle='Random Randomov'>
           <Filter filterValues={filterValues} setFilterValues={setFilterValues} productFilters={productFilters} />
            {offerList}
        </ScreenContainer>
    );
};

export default OffersScreen;
