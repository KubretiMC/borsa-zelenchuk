import React, { useState } from 'react';
import ScreenContainer from '../components/ScreenContainer';
import Offer from '../components/Offer';
import Filter from '../components/Filter';
import { FilterValues, Product, RootState } from '../interfaces/interfaces';
import { useSelector } from 'react-redux';
import OffersList from '../components/OffersList';

const OffersScreen: React.FC = () => {
    const loggedUser = useSelector((state: RootState) => state.loggedUser);
    const products = useSelector((state: RootState) => state.products);
    const productFilters = useSelector((state: RootState) => state.productFilters);

    const initialFilterValues: FilterValues = {
        name: 'Всички',
        place: 'Всички',
        minCost: 0,
        maxCost: 9999.99,
    };

    const [filterValues, setFilterValues] = useState(initialFilterValues);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const filteredProductsList = products.filter((product: Product) => {
        const { name, place, minCost, maxCost } = filterValues;

        const nameMatch = name === 'Всички' || product.name === name;
        const placeMatch = place === 'Всички' || product.place === place;
        const costMatch = (minCost <= product.cost && maxCost >= product.cost) || (minCost === 0 && maxCost === 0);
        const notInOffers = !loggedUser?.offers?.includes(product.id);
        return nameMatch && placeMatch && costMatch && notInOffers;
    });

    const slicedProducts = filteredProductsList.slice(startIndex, endIndex);

    const offersList = slicedProducts
        .filter((product: Product) => !product.reserved) 
        .map((product: Product) => (
            <Offer key={product.id} id={product.id} name={product.name} place={product.place} cost={product.cost} image={product.image} />
        ));

    return (
        <ScreenContainer subtitle={loggedUser?.username || ''} backButton>
            <Filter filterValues={filterValues} setFilterValues={setFilterValues} productFilters={productFilters} />
            <OffersList 
                offersList={offersList} 
                lastPage={endIndex >= filteredProductsList.length} 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage}
            />
        </ScreenContainer>
    );
};

export default OffersScreen;
