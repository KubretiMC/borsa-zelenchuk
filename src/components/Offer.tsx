import React from 'react';

interface OfferProps {
  good: string;
  place: string;
  image: string;
  cost: number;
}

const Offer: React.FC<OfferProps> = ({ good, place, cost, image }) => {
  return (
    <div className="flex flex-col sm:flex-row border mt-5 pb-2">
        <div>
            <img
                src={image}
                alt='Image Description'
                className='w-full h-56'
            />
        </div>
        <div className='mx-2 mt-2'>
            <div className="flex justify-between sm:pl-4 sm:mt-0">
                <h1>{good}</h1>
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
