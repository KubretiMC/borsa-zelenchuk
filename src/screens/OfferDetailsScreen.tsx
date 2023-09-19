import { useNavigate, useParams } from 'react-router-dom';
import ScreenContainer from '../components/ScreenContainer';
import Row from '../components/Row';
import { Product, RootState, User } from '../interfaces/interfaces';
import { useSelector } from 'react-redux';
import Button from '../components/Button';
import ProductHeader from '../components/ProductHeader';
import Modal from '../components/Modal';
import { useState } from 'react';

const OfferDetailsScreen = () => {
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
    dateAdded = ''
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
          <ProductHeader name={name} image={image} />
          <div className="grid grid-cols-1 gap-4 mt-5">
            <Row
              label="Стока"
              value={name}
              type={'label'}
            />
            <Row
              label="Цена"
              value={`${cost} лв./кг.`}
              type={'label'}
            />
            <Row
              label="Местоположение"
              value={place}
              type={'label'}
            />
            <Row
              label="Наличност"
              value={availability}
              type={'label'}
            />
            <Row
              label="Минимална поръчка"
              value={minOrder}
              type={'label'}
            />
            <Row
              label="Телефонен номер"
              value={'012346789'}
              type={'label'}
            />
            <Row
              label="Дата на добавяне"
              value={dateAdded}
              type={'label'}
            />
            <Row
              label="Качено от"
              value={username}
              type={'label'}
              onClick={() => setIsModalOpened(true)}
              labelClassName={'text-left flex ml-14 font-bold'}
            />
            {additionalInformation && (
              <div className="border-2 p-2 rounded-md mt-4">
                <div className="font-bold">
                  <label>Допълнителна информация:</label>
                </div>
                <div className="text-left">
                  <label>{additionalInformation}</label>
                </div>
              </div>
            )}
          </div>
          <Button title='Резервирай' onClick={() => handleReserveClick()} />
        </div>
      ) : (
        <p>Проблем с показването на продукта</p>
      )}
      <Modal 
        isOpen={isModalOpened} 
        className='bg-gray-200 rounded-lg p-4 max-w-md w-full flex flex-col items-center justify-center mx-12'
      >
        <div>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <Row
              label="Име"
              value={username}
              type={'label'}
              onClick={() => console.log('ffff')}
            />
            <Row
              label="Номер"
              value={phoneNumber}
              type={'label'}
            />
          </div>
          <div>
            <Button title={'Блокирай'} onClick={() => console.log('blockUser')} />
            <Button title={'Затвори'} onClick={() =>setIsModalOpened(false)} />
          </div>
        </div>
      </Modal>
    </ScreenContainer>
  );
};

export default OfferDetailsScreen;
