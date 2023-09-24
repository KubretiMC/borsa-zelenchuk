import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { OFFERS_UNAVAILABLE, PAGES_ENDED, PAGES_STARTED } from '../constants/constants';

interface OffersListProps {
  offersList: any[];
  lastPage: boolean;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
}

const OffersList: React.FC<OffersListProps> = ({ offersList, lastPage, currentPage, setCurrentPage }) => {
  const changePage = (nextPage: boolean) => {
    if(nextPage) {
      if(lastPage) {
        alert(PAGES_ENDED)
      } else {
        setCurrentPage(currentPage + 1);
      }
    } else {
      if(currentPage === 1) {
        alert(PAGES_STARTED)
      } else {
        setCurrentPage(currentPage - 1)
      }
    }
  }

  return (
    <div>
      {offersList.length === 0 ? (
        <div className='mt-24'>
            <label className='text-3xl font-bold'>{OFFERS_UNAVAILABLE}</label>
        </div>
      ) : (
        <>
          {offersList}
          <div className="pagination">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="mr-2"
              onClick={() => changePage(false)}
            />
            <span>Page {currentPage}</span>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="ml-2"
              onClick={() => changePage(true)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default OffersList;
