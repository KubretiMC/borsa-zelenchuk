import { useNavigate, useParams } from 'react-router-dom';
import ScreenContainer from '../components/ScreenContainer';
import Row from '../components/Row';
import { Product, RootState } from '../interfaces/interfaces';
import { useSelector } from 'react-redux';
import Button from '../components/Button';
import ProductHeader from '../components/ProductHeader';
import Modal from '../components/Modal';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const OfferDetailsScreen = () => {
  const { t } = useTranslation();
  const { id = '' } = useParams();
 
  const loggedUser = useSelector((state: RootState) => state.loggedUser);
  const users = useSelector((state: RootState) => state.users);
  const products = useSelector((state: RootState) => state.products);
  
  const selectedProduct: Product | undefined = products.find((product: Product) => product.id === id);
  const { 
    name = '', 
    cost = 0, 
    place = '', 
    image = '', 
    availability = 0, 
    minOrder = 0, 
    additionalInformation = '',
    dateAdded = '',
    reserved = false,
  } = selectedProduct || {};

  const selectedUser = users.find((user) => user.offers && user.offers.includes(id));
  const { phoneNumber = '', username = '' } = selectedUser || {};
  
  const [isModalOpened, setIsModalOpened] = useState(false);
  const navigate = useNavigate();

  const handleReserveClick = () => {
      navigate(`/offer/${id}/reserve`);
  };

  return (
    <ScreenContainer subtitle={loggedUser?.username || ''} backButton>
      {selectedProduct ? (
        <div className='mt-2'>
          <ProductHeader name={t(name)} image={image} />
          <div className="grid grid-cols-1 gap-4 mt-5">
            <Row
              label={t('STOCK')}
              value={t(name)}
              type={'label'}
            />
            <Row
              label={t('COST')}
              value={`${cost} ${t('LEV_PER_KG')}`}
              type={'label'}
            />
            <Row
              label={t('PLACE')}
              value={t(place)}
              type={'label'}
            />
            <Row
              label={t('AVAILABILITY')}
              value={availability}
              type={'label'}
            />
            <Row
              label={t('OFFER_MIN')}
              value={minOrder}
              type={'label'}
            />
            <Row
              label={t('ADDED_DATE')}
              value={dateAdded}
              type={'label'}
            />
            {selectedUser?.id !== loggedUser?.id &&
              <Row
                label={t('ADDED_FROM')}
                value={username}
                type={'label'}
                onClick={() => setIsModalOpened(true)}
                labelClassName={'text-left flex ml-14 font-bold'}
              />
            }
            {additionalInformation && (
              <div className="border-2 p-2 rounded-md mt-4">
                <div className="font-bold">
                  <label>{t('INFO_ADDITIONAL')}</label>
                </div>
                <div className="text-left">
                  <label>{additionalInformation}</label>
                </div>
              </div>
            )}
          </div>
          {selectedUser?.id !== loggedUser?.id && !reserved &&
            <Button title='Резервирай' onClick={() => handleReserveClick()} />
          }
        </div>
      ) : (
        <p>{t('PRODUCT_SHOW_ERROR')}</p>
      )}
      <Modal 
        isOpen={isModalOpened} 
        className='bg-gray-200 rounded-lg p-4 max-w-md w-full flex flex-col items-center justify-center mx-12'
      >
        <div>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <Row
              label={t('NAME')}
              value={username}
              type={'label'}
              onClick={() => console.log('ffff')}
            />
            <Row
              label={t('NUMBER')}
              value={phoneNumber}
              type={'label'}
            />
          </div>
          <div>
            <Button title={t('CLOSE')} onClick={() =>setIsModalOpened(false)} />
          </div>
        </div>
      </Modal>
    </ScreenContainer>
  );
};

export default OfferDetailsScreen;
