import React from 'react';
import ScreenContainer from '../components/ScreenContainer';
import Offer from '../components/Offer';

const OffersScreen: React.FC = () => {
    const stocksList = [
        { id: 1, good:'Диня', place: 'Огняново', cost: 1.2, image: 'https://zemedeleca.bg/wp-content/uploads/2023/05/%D0%94%D0%B8%D0%BD%D0%B8.jpg'  },
        { id: 2, good:'Череша', place: 'Динката', cost: 2.5, image: 'https://trud.bg/public/images/articles/2015-05/image__4754527--4754232_3580228130795270688_big.jpg' },
        { id: 3, good:'Праскова', place: 'Мало Конаре', cost: 4, image: 'https://agri.bg/media/2019/08/03/409961/740x500.jpg' },
    ];

    const offerList = stocksList.map((stock) => (
        <Offer key={stock.id} good={stock.good} place={stock.place} cost={stock.cost} image={stock.image} />
    ))

    return (
        <ScreenContainer subtitle='Random Randomov'>
            {offerList}
        </ScreenContainer>
    );
};

export default OffersScreen;
