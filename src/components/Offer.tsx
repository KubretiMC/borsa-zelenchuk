import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

interface OfferProps {
    id: string;
    name: string;
    place: string;
    image: string;
    cost: number;
    profileOffer?: boolean;
    reserved?: boolean;
    buttonName?: string;
    buttonClick?: () => void;
}

const Offer: React.FC<OfferProps> = ({ id, name, place, cost, image, profileOffer, reserved, buttonName, buttonClick }) => {
    const navigate = useNavigate();

    const handleViewDetailsClick = () => {
        navigate(`/offer/${id}`);
    };

    return (
        <div className="border mt-5 bg-gray-400">
            <button onClick={handleViewDetailsClick}>
                <img
                    src={image}
                    alt='description'
                    className=' w-screen h-56'
                />
            </button>
            <div className='mx-2 mt-2'>
                <div className="flex justify-between sm:pl-4 sm:mt-0">
                    <h1>{name}</h1>
                    {!profileOffer && <h1>{place}</h1>}
                </div>
                <div className="flex items-start">
                    {
                        <h1>{cost} {profileOffer ? "лв." : "лв/кг."}</h1> 
                    }
                </div>
                {reserved && 
                    <div className="flex items-start">
                        <h1>Резервирана</h1>
                    </div>
                }
                {profileOffer && buttonName &&
                    <Button title={buttonName} onClick={buttonClick} />
                }
            </div>
        </div>
    );
};

export default Offer;
