import React, { useState } from 'react';
import ScreenContainer from '../components/ScreenContainer';
import Offer from '../components/Offer';
import Filter from '../components/Filter';
import { FilterValues } from '../interfaces/interfaces';

const OffersScreen: React.FC = () => {
    const initialFilterValues: FilterValues = {
        good: 'Всички',
        place: 'Всички',
        minCost: 0,
        maxCost: 9999.99,
    };

    const [filterValues, setFilterValues] = useState(initialFilterValues);

    const stocksList = [
        { id: 1, good:'Диня', place: 'Огняново', cost: 1.2, image: 'https://zemedeleca.bg/wp-content/uploads/2023/05/%D0%94%D0%B8%D0%BD%D0%B8.jpg' },
        { id: 2, good:'Череша', place: 'Мало Конаре', cost: 4, image: 'https://trud.bg/public/images/articles/2015-05/image__4754527--4754232_3580228130795270688_big.jpg' },
        { id: 3, good:'Диня', place: 'Огняново', cost: 1.5, image: 'https://zemedeleca.bg/wp-content/uploads/2023/05/%D0%94%D0%B8%D0%BD%D0%B8.jpg' },
        { id: 4, good:'Череша', place: 'Динката', cost: 2.5, image: 'https://trud.bg/public/images/articles/2015-05/image__4754527--4754232_3580228130795270688_big.jpg' },
        { id: 5, good:'Праскова', place: 'Мало Конаре', cost: 4, image: 'https://agri.bg/media/2019/08/03/409961/740x500.jpg' },
    ];

    const stockFilters = {
        goods: ['Диня', 'Череша', 'Праскова', 'Ягода'],
        place: ['Огняново', 'Мало Конаре', 'Динката', 'Мокрище'],
    }

    const filteredStocksList = stocksList.filter((stock) => {
        const { good, place, minCost, maxCost } = filterValues;

        const goodMatch = good === 'Всички' || stock.good === good;
        const placeMatch = place === 'Всички' || stock.place === place;
        const costMatch = (minCost <= stock.cost && maxCost >= stock.cost) || (minCost === 0 && maxCost === 0);

        return goodMatch && placeMatch && costMatch;
    });

    const offerList = filteredStocksList.map((stock) => (
        <Offer key={stock.id} good={stock.good} place={stock.place} cost={stock.cost} image={stock.image} />
    ));

    return (
        <ScreenContainer subtitle='Random Randomov'>
           <Filter filterValues={filterValues} setFilterValues={setFilterValues} stockFilters={stockFilters} />
            {offerList}
        </ScreenContainer>
    );
};

export default OffersScreen;
