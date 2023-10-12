import React, { useEffect, useState } from 'react';
import ScreenContainer from '../components/ScreenContainer';
import { useDispatch, useSelector } from 'react-redux';
import { Product, RootState } from '../interfaces/interfaces';
import Collapsible from 'react-collapsible';
import Offer from '../components/Offer';
import { finishProduct } from '../redux/actions';
import Button from '../components/Button';
import Row from '../components/Row';
import { useTranslation } from 'react-i18next';
import Modal from '../components/Modal';
import Spinner from '../components/Spinner';

const ProfileScreen: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState<{ isOpen: boolean; text: string }>({ isOpen: false, text: '' });
  const [offersSectionSelected, setOffersSectionSelected] = useState(true);

  useEffect(() => {
    if(modalData.isOpen) {
      setTimeout(() => {
        setModalData({ text: '', isOpen: false})
      }, 2000);
    }
  }, [modalData])

  const handleMyOffersClick = () => {
    setOffersSectionSelected(true);
  };

  const handleMyProfileClick = () => {
    setOffersSectionSelected(false);
  };

  const handleFinishProduct = async (productId: string) => { 
    try {
      setLoading(true);

      const token = localStorage.getItem('authToken');
      const apiUrl = process.env.REACT_APP_API_URL;  
      const response = await fetch(`${apiUrl}/product/finishProduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();
      console.log('error4444', data);
      if (response.ok) {
        setModalData({ isOpen: true, text: t(data.message) });
        dispatch(finishProduct(productId));
      } else {
        console.log('error4444', data);
        setModalData({ isOpen: true, text: t(data.error) });
      }
    } catch (error) {
      setModalData({ isOpen: true, text: t('ERROR_OCCURED') });
    } finally {
      setLoading(false);
    }
  };

  const products = useSelector((state: RootState) => state.products);
  const loggedUser = useSelector((state: RootState) => state.loggedUser);

  const { id = '', username = '', phoneNumber = '', offers = [], userReserved = [] } = loggedUser || {};

  const [passwordValues, setPasswordValues] = useState({
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPasswordValues({
      ...passwordValues,
      [name]: value,
    });
  };

  const handleChangePassword = async (currentPassword: string, newPassword: string, confirmPassword: string, userId: string) => {
    if(newPassword !== confirmPassword) {
      setModalData({ isOpen: true, text: t('PASSWORD_NOT_MATCH') });
    } else {
      try {
        setLoading(true);

        const token = localStorage.getItem('authToken');
        const apiUrl = process.env.REACT_APP_API_URL;  
        const response = await fetch(`${apiUrl}/user/updatePassword`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ userId, currentPassword, newPassword }),
        });

        const data = await response.json();

        if (response.ok) {
          setModalData({ isOpen: true, text: t(data.message) });
        } else {
          setModalData({ isOpen: true, text: t(data.error) });
        }
      } catch (error) {
        setModalData({ isOpen: true, text: t('ERROR_OCCURED') });
      } finally {
        setLoading(false);
      }
    }
  };
  

  const userOffers = products
    .filter((product: Product) => 
      (!product.finished) && 
      (offers.includes(product.id))
    )
    .map((product: Product) => (
      <Offer 
        key={product.id} 
        id={product.id} 
        name={product.name} 
        place={product.place} 
        cost={product.reserved ? product.reservedCost : product.cost * product.availability} 
        image={product.image} 
        profileOffer
        reserved={product.reserved}
        buttonName={t('OFFER_REMOVE')}
        buttonClick={() => handleFinishProduct(product.id)}
      />
  ));

  const userReservations = products
    .filter((product: Product) => 
      userReserved.includes(product.id)
    )
    .map((product: Product) => (
      <Offer 
        key={product.id} 
        id={product.id} 
        name={product.name} 
        place={product.place} 
        cost={product.reservedCost} 
        image={product.image} 
        profileOffer
      />
    ));

  return (
    <ScreenContainer subtitle={username || ''} backButton>
      {loading && (
        <Spinner />
      )}
      <div className="flex justify-center mt-5">
        <Button title={t('MY_OFFERS')} onClick={handleMyOffersClick} className={`btn2 ${!offersSectionSelected && `mt-4`}`}/>
        <Button title={t('MY_PROFILE')} onClick={handleMyProfileClick} className={`btn2 ${offersSectionSelected && `mt-4`}`} />
      </div>
      <hr className="border-gray-300 border-t" />
      {offersSectionSelected ?
        <div className="mt-5">
          <div className="mb-5">
            <Collapsible 
              trigger={t('MY_OFFERS')}
              triggerClassName="collapsible flex"
              openedClassName="collapsible text-left" 
            >
              <div>
                {userOffers.length !==0 ? 
                  userOffers : 
                  <div className='mt-24'>
                      <label className='text-3xl font-bold'>{t('OFFERS_NOT_MADE')}</label>
                  </div>
                  }
              </div>
            </Collapsible>
          </div>
          <div>
            <Collapsible 
              trigger="Моите резервации" 
              triggerClassName="collapsible flex"
              openedClassName="collapsible text-left" 
            >
              <div>
                {userReservations.length !==0 ?
                userReservations :
                <div className='mt-24'>
                    <label className='text-3xl font-bold'>{t('RESERVATIONS_NOT_MADE')}</label>
                </div>
                }
              </div>
            </Collapsible>
          </div>
        </div>
      :
        <div className="grid grid-cols-1 gap-4 mt-5">
           <Row
              label={t('NAME')}
              value={username}
              type={'label'}
              labelClassName='text-left flex'
            />
            <Row
              label={t('NUMBER')}
              value={phoneNumber}
              type={'label'}
              labelClassName='text-left flex'
            />
            <Row
              label={t('PASSWORD')}
              value="password"
              filterValues={passwordValues}
              handleInputChange={handleInputChange}
              type='password'
            />
            <Row
              label={t('PASSWORD_NEW')}
              value="newPassword"
              filterValues={passwordValues}
              handleInputChange={handleInputChange}
              type='password'
            />
            <Row
              label={t('PASSWORD_CONFIRM')}
              value="confirmPassword"
              filterValues={passwordValues}
              handleInputChange={handleInputChange}
              type='password'
            />
            <Button title={'Промени паролата'} onClick={() => 
              handleChangePassword(passwordValues.password, passwordValues.newPassword, passwordValues.confirmPassword, id)} 
            />
        </div>
    }
    <Modal isOpen={modalData.isOpen}>
        <h2 className="text-xl font-bold text-blue-800 text-center">{modalData.text}</h2>
    </Modal>
    </ScreenContainer>
  );
};

export default ProfileScreen;
