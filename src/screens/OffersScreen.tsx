import React, { useEffect, useState } from 'react';
import ScreenContainer from '../components/ScreenContainer';
import Offer from '../components/Offer';
import Filter from '../components/Filter';
import { FilterValues, Product, RootState } from '../interfaces/interfaces';
import { useSelector } from 'react-redux';
import OffersList from '../components/OffersList';
import { useTranslation } from 'react-i18next';

const OffersScreen: React.FC = () => {
    const { t, i18n } = useTranslation();

    const loggedUser = useSelector((state: RootState) => state.loggedUser);
    const products = useSelector((state: RootState) => state.products);
    const productFilters = useSelector((state: RootState) => state.productFilters);

    const [filteredProductsList, setFilteredProductsList] = useState<Product[]>([]);
    const [filterValues, setFilterValues] = useState<FilterValues>({
        name: t('ALL'),
        place: t('ALL'),
        minCost: undefined,
        maxCost: undefined,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    useEffect(() => {
        // reset and translate filterValues and reset pages when changing language
        setFilterValues({
            name: t('ALL'),
            place: t('ALL'),
            minCost: undefined,
            maxCost: undefined,
        });
        setCurrentPage(1);
    }, [t, i18n.language]);

    useEffect(() => {
        const filterProducts = () => {
            const filteredList = products.filter((product: Product) => {
                const { name = '', place = '', minCost = 0, maxCost = 0 } = filterValues;
                const nameMatch = name === t('ALL') || t(product.name) === name;
                const placeMatch = place === t('ALL') || t(product.place) === place;
                const costMatch = (minCost <= product.cost && maxCost >= product.cost) || (minCost === 0 && maxCost === 0) || (minCost <= product.cost && maxCost === 0);
                const notInOffers = !loggedUser?.offers?.includes(product.id);
                const notReserved = !product.reserved;
                const notFinished = !product.finished;
                return nameMatch && placeMatch && costMatch && notInOffers && notReserved && notFinished;
            });
            setFilteredProductsList(filteredList);
        };
        filterProducts();
    }, [filterValues, t, products, loggedUser?.offers])
    

    const slicedProducts = filteredProductsList.slice(startIndex, endIndex);
    const offersList = slicedProducts
        .filter((product: Product) => !product.reserved) 
        .map((product: Product) => (
            <Offer key={product.id} id={product.id} name={t(product.name)} place={t(product.place)} cost={product.cost} image={product.image} />
        ));

    return (
        <ScreenContainer subtitle={loggedUser?.username || ''} backButton>
            <Filter filterValues={filterValues} setFilterValues={setFilterValues} productFilters={productFilters} resetPage={() => setCurrentPage(1)}/>
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
