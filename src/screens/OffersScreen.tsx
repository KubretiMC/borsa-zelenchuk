import React, { useEffect, useState } from 'react';
import ScreenContainer from '../components/ScreenContainer';
import Offer from '../components/Offer';
import Filter from '../components/Filter';
import { FilterValues, Product, RootState } from '../interfaces/interfaces';
import { useSelector } from 'react-redux';
import OffersList from '../components/OffersList';
import { useTranslation } from 'react-i18next';
import { findKeyByTranslation } from '../utils/utils';
import bgTranslation from './../locales/bg.json';
import enTranslation from './../locales/en.json';

const OffersScreen: React.FC = () => {
    const { t, i18n } = useTranslation();

    const loggedUser = useSelector((state: RootState) => state.loggedUser);
    const products = useSelector((state: RootState) => state.products);
    const productFilters = useSelector((state: RootState) => state.productFilters);

    const [filterValues, setFilterValues] = useState<FilterValues>({
        name: t('ALL'),
        place: t('ALL'),
        minCost: undefined,
        maxCost: undefined,
    });

    const [filteredProductsList, setFilteredProductsList] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    

    const updateFilterValues = () => {
        const { name, place, minCost, maxCost } = filterValues;
        const originalKeyName = findKeyByTranslation(i18n.language === 'bg' ? enTranslation : bgTranslation, name) as string;
        const originalKeyPlace = findKeyByTranslation(i18n.language === 'bg' ? enTranslation : bgTranslation, place) as string;

        // if there is value, translate it, if there is not - set initial one
        const updatedFilterValueName = name ? t(originalKeyName) : t('ALL');
        const updatedFilterValuePlace = place ? t(originalKeyPlace) : t('ALL');

        // if there is value, use it, if there is not - set initial one
        const updatedFilterMinCost = minCost ? minCost : undefined;
        const updatedFilterMaxCost = maxCost ? maxCost : undefined;

        return {
            name: updatedFilterValueName,
            place: updatedFilterValuePlace,
            minCost: updatedFilterMinCost,
            maxCost: updatedFilterMaxCost,
        };
    }

    const getFilteredProducts = () => {
        const filteredList = products.filter((product: Product) => {
            const { name = '', place = '', minCost = 0, maxCost = 0 } = filterValues;
            const nameMatch = name === t('ALL') || t(product.name) === name;
            const placeMatch = place === t('ALL') || t(product.place) === place;
            const costMatch = (minCost <= product.cost && maxCost >= product.cost) || (minCost === 0 && maxCost === 0);
            const notInOffers = !loggedUser?.offers?.includes(product.id);
            return nameMatch && placeMatch && costMatch && notInOffers;
        });
        return filteredList;
    }

    useEffect(() => {
        const filteredList = getFilteredProducts();
        setFilteredProductsList(filteredList);
    }, [getFilteredProducts])

    useEffect(() => {
        const updatedFilterValues: FilterValues = updateFilterValues();
        setFilterValues(updatedFilterValues);
    }, [updateFilterValues]);

    
    useEffect(() => {
        setCurrentPage(1);
    }, [filterValues])

    // to fix sliced products
    // const slicedProducts = filteredProductsList.slice(startIndex, endIndex);
    // console.log('slicedProducts', slicedProducts);
    const offersList = filteredProductsList
        .filter((product: Product) => !product.reserved) 
        .map((product: Product) => (
            <Offer key={product.id} id={product.id} name={t(product.name)} place={t(product.place)} cost={product.cost} image={product.image} />
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
