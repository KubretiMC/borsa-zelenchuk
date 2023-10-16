import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';

interface OffersListProps {
  offersList: any[];
  lastPage: boolean;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
}

const OffersList: React.FC<OffersListProps> = ({ offersList, lastPage, currentPage, setCurrentPage }) => {
  const { t } = useTranslation();

  const [modalData, setModalData] = useState<{ isOpen: boolean; text: string }>({ isOpen: false, text: '' });

  useEffect(() => {
    if(modalData.isOpen) {
      setTimeout(() => {
        setModalData({ text: '', isOpen: false})
      }, 2000);
    }
  }, [modalData])
  
  const changePage = (nextPage: boolean) => {
    if(nextPage) {
      if(lastPage) {
        setModalData({ isOpen: true, text: t('PAGES_ENDED') });
      } else {
        setCurrentPage(currentPage + 1);
      }
    } else {
      if(currentPage === 1) {
        setModalData({ isOpen: true, text: t('PAGES_STARTED') });
      } else {
        setCurrentPage(currentPage - 1)
      }
    }
  }

  return (
    <div>
      {offersList.length === 0 ? (
        <div className='mt-24'>
            <label className='text-3xl font-bold'>{t('OFFERS_UNAVAILABLE')}</label>
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
      <Modal isOpen={modalData.isOpen}>
          <h2 className="text-xl font-bold text-blue-800 text-center">{modalData.text}</h2>
      </Modal>
    </div>
  );
};

export default OffersList;
