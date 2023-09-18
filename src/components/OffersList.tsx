import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface OffersListProps {
  offersList: any[];
  lastPage: boolean;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
}

const OffersList: React.FC<OffersListProps> = ({ offersList, lastPage, currentPage, setCurrentPage }) => {
  return (
    <div>
      {offersList.length === 0 ? (
        <div className='mt-24'>
            <label className='text-3xl font-bold'>Няма налични оферти</label>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default OffersList;
