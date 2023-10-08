import React, { useState } from 'react';
import ScreenContainer from '../components/ScreenContainer';
import { useDispatch, useSelector } from 'react-redux';
import { Product, RootState } from '../interfaces/interfaces';
import Collapsible from 'react-collapsible';
import Offer from '../components/Offer';
import { finishProduct } from '../redux/actions';
import Button from '../components/Button';
import Row from '../components/Row';
import { 
  PASSWORD_CONFIRM,
  MY_OFFERS,
  MY_PROFILE,
  NAME,
  PASSWORD,
  PASSWORD_NOT_MATCH,
  PASSWORD_CHANGED,
  OFFER_REMOVE,
  OFFERS_NOT_MADE,
  RESERVATIONS_NOT_MADE,
  PASSWORD_NEW
} from '../constants/constants';

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch();

  const [offersSectionSelected, setOffersSectionSelected] = useState(true);

  const handleMyOffersClick = () => {
    setOffersSectionSelected(true);
  };

  const handleMyProfileClick = () => {
    setOffersSectionSelected(false);
  };

  const handleFinishProduct = async (productId: string) => { 
    try {
      const apiUrl = process.env.REACT_APP_API_URL;  
      const response = await fetch(`${apiUrl}/product/finishProduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        dispatch(finishProduct(productId));
      } else {
        console.error('Error finishing product:', response.statusText);
      }
    } catch (error) {
      console.error('Error finishing product:', error);
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
      alert(PASSWORD_NOT_MATCH);
    } else {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;  
        const response = await fetch(`${apiUrl}/user/updatePassword`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, currentPassword, newPassword }),
        });
      
        if (response.ok) {
          alert(PASSWORD_CHANGED);
        } else if (response.status === 400) {
          // when current password doesn't match
          const errorResponse = await response.json();
          alert(errorResponse.error);
        } else {
          // other errors
          alert('Error updating password');
        }
      } catch (error) {
        console.error('Error changing password:', error);
        alert('Error changing password');
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
        buttonName={OFFER_REMOVE}
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
      <div className="flex justify-center mt-5">
        <Button title={MY_OFFERS} onClick={handleMyOffersClick} className={`btn2 ${!offersSectionSelected && `mt-4`}`}/>
        <Button title={MY_PROFILE} onClick={handleMyProfileClick} className={`btn2 ${offersSectionSelected && `mt-4`}`} />
      </div>
      <hr className="border-gray-300 border-t" />
      {offersSectionSelected ?
        <div className="mt-5">
          <div className="mb-5">
            <Collapsible 
              trigger={MY_OFFERS}
              triggerClassName="collapsible flex"
              openedClassName="collapsible text-left" 
            >
              <div>
                {userOffers.length !==0 ? 
                  userOffers : 
                  <div className='mt-24'>
                      <label className='text-3xl font-bold'>{OFFERS_NOT_MADE}</label>
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
                    <label className='text-3xl font-bold'>{RESERVATIONS_NOT_MADE}</label>
                </div>
                }
              </div>
            </Collapsible>
          </div>
        </div>
      :
        <div className="grid grid-cols-1 gap-4 mt-5">
           <Row
              label={NAME}
              value={username}
              type={'label'}
              labelClassName='text-left flex'
            />
            <Row
              label="Номер"
              value={phoneNumber}
              type={'label'}
              labelClassName='text-left flex'
            />
            <Row
              label={PASSWORD}
              value="password"
              filterValues={passwordValues}
              handleInputChange={handleInputChange}
              type='password'
            />
            <Row
              label={PASSWORD_NEW}
              value="newPassword"
              filterValues={passwordValues}
              handleInputChange={handleInputChange}
              type='password'
            />
            <Row
              label={PASSWORD_CONFIRM}
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
    </ScreenContainer>
  );
};

export default ProfileScreen;
