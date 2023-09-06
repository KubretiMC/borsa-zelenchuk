import React from 'react';
import { useNavigate } from 'react-router-dom';

interface OfferProps {
    id: string;
    name: string;
    place: string;
    image: string;
    cost: number;
}

const Offer: React.FC<OfferProps> = ({ id, name, place, cost, image }) => {
    const navigate = useNavigate();

    const handleViewDetailsClick = () => {
        navigate(`/offer/${id}`);
    };

    return (
        <div className="border mt-5 pb-2">
            <button onClick={handleViewDetailsClick}>
                <img
                    src={image}
                    alt='Image Description'
                    className=' w-screen h-56'
                />
            </button>
            <div className='mx-2 mt-2'>
                <div className="flex justify-between sm:pl-4 sm:mt-0">
                    <h1>{name}</h1>
                    <h1>{place}</h1>
                </div>
                <div className="flex items-start">
                    <h1>{cost} лв/кг.</h1>
                </div>
            </div>
        </div>
    );
};

export default Offer;
