import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface OffersListProps {
    offersList: any;
    lastPage: boolean;
    currentPage: number,
    setCurrentPage: (currentPAge: number) => void;
}

const OffersList: React.FC<OffersListProps> = ({ offersList, lastPage, currentPage, setCurrentPage }) => {
  return (
   <div>
    {offersList}
    <div className="pagination">
        <FontAwesomeIcon 
            icon={faArrowLeft} 
            className="mr-2" 
            onClick={() => currentPage !== 1 && setCurrentPage(currentPage - 1)}
        />
        <span>Page {currentPage}</span>
        <FontAwesomeIcon 
            icon={faArrowRight} 
            className="ml-2" 
            onClick={() => !lastPage && setCurrentPage(currentPage + 1)}
        />
    </div>
   </div>
  );
};

export default OffersList;
