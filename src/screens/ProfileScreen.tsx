import React, { useState } from 'react';
import ScreenContainer from '../components/ScreenContainer';
import { useDispatch, useSelector } from 'react-redux';
import { Product, RootState } from '../interfaces/interfaces';
import Collapsible from 'react-collapsible';
import Offer from '../components/Offer';
import { finishProduct, updatePassword } from '../redux/actions';
import Button from '../components/Button';
import Row from '../components/Row';

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch();

  const [offersSectionSelected, setOffersSectionSelected] = useState(true);

  const handleMyOffersClick = () => {
    setOffersSectionSelected(true);
  };

  const handleMyProfileClick = () => {
    setOffersSectionSelected(false);
  };

  const handleFinishProduct = (productId: string) => {
    dispatch(finishProduct(productId));
  }

  const products = useSelector((state: RootState) => state.products);
  const loggedUser = useSelector((state: RootState) => state.loggedUser);

  const { id = '', username = '', password = '', phoneNumber = '', offers = [], reserves = [], userReserved = [] } = loggedUser || {};

  const [passwordValues, setPasswordValues] = useState({
    password: password,
    confirmPassword: password,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPasswordValues({
      ...passwordValues,
      [name]: value,
    });
  };

  const handleChangePassword = (password: string, confirmPassword: string, userId: string) => {
    if(password === confirmPassword) {
      dispatch(updatePassword(userId, password))
      alert("Паролата е сменена успешно!")
    } else {
      alert("Паролите не съвпадат!")
    }
  }

  const userOffers = products
    .filter((product: Product) => 
      (!product.finished) && 
      (offers.includes(product.id) || userReserved.includes(product.id))
    )
    .map((product: Product) => (
      <Offer 
        key={product.id} 
        id={product.id} 
        name={product.name} 
        place={product.place} 
        cost={product.cost * product.availability} 
        image={product.image} 
        profileOffer
        reserved={product.reserved}
        buttonName='Премахни оферта'
        buttonClick={() => handleFinishProduct(product.id)}
      />
  ));


  const userReservations = products
    .filter((product: Product) => 
      (!product.finished) && 
      reserves.includes(product.id)
    )
    .map((product: Product) => (
      <Offer 
        key={product.id} 
        id={product.id} 
        name={product.name} 
        place={product.place} 
        cost={product.cost * product.availability} 
        image={product.image} 
        profileOffer
        buttonName='Премахни резервация'
        buttonClick={() => handleFinishProduct(product.id)}
      />
    ));

  return (
    <ScreenContainer subtitle={username || ''} backButton>
      <div className="flex justify-center mt-5">
        <Button title={'Моите оферти'} onClick={handleMyOffersClick} className={`btn2 ${!offersSectionSelected && `mt-4`}`}/>
        <Button title={'Моят профил'} onClick={handleMyProfileClick} className={`btn2 ${offersSectionSelected && `mt-4`}`} />
      </div>
      <hr className="border-gray-300 border-t" />
      {offersSectionSelected ?
        <div className="mt-5">
          <div className="mb-5">
            <Collapsible 
              trigger="Моите оферти" 
              triggerClassName="collapsible flex"
              openedClassName="collapsible text-left" 
            >
              <div>
                {userOffers.length !==0 ? 
                  userOffers : 
                  <div className='mt-24'>
                      <label className='text-3xl font-bold'>Нямате пуснати оферти</label>
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
                    <label className='text-3xl font-bold'>Нямате резервации</label>
                </div>
                }
              </div>
            </Collapsible>
          </div>
        </div>
      :
        <div className="grid grid-cols-1 gap-4 mt-5">
           <Row
              label="Име"
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
              label="Парола"
              value="password"
              filterValues={passwordValues}
              handleInputChange={handleInputChange}
              type='password'
            />
            <Row
              label="Повторете парола"
              value="confirmPassword"
              filterValues={passwordValues}
              handleInputChange={handleInputChange}
              type='password'
            />
            <Button title={'Промени паролата'} onClick={() => handleChangePassword(passwordValues.password, passwordValues.confirmPassword, id)} />
        </div>
    }
    </ScreenContainer>
  );
};

export default ProfileScreen;
