import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import ScreenContainer from '../components/ScreenContainer';
import { Product, RootState } from '../interfaces/interfaces';
import ProductHeader from '../components/ProductHeader';
import Row from '../components/Row';
import RangeSlider from '../components/RangeSlider';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { useTranslation } from 'react-i18next';

const ReserveScreen = () => {
  const { t } = useTranslation();

  const { id = '' } = useParams();

  const navigate = useNavigate();

  const loggedUser = useSelector((state: RootState) => state.loggedUser);
  const products = useSelector((state: RootState) => state.products);

  const selectedProduct: Product | undefined = products.find((product: Product) => product.id === id);
  const { 
    name = '', 
    cost = 0,  
    image = '', 
    availability = 0, 
    minOrder = 0, 
  } = selectedProduct || {};

  const [orderQuantity, setOrderQuantity] = useState<number>(minOrder);
  const [orderCost, setOrderCost] = useState<string>('');
  const [modalData, setModalData] = useState<{ isOpen: boolean; text: string }>({ isOpen: false, text: '' });

  useEffect(() => {
    const newOrderCost = (orderQuantity * cost).toFixed(2);
    setOrderCost(newOrderCost);
  }, [cost, minOrder, orderQuantity]);

  const handleReserveClick = (productId: string, orderQuantity: number, minOrder: number, reservedCost: string, userId?: string) => {
    if (userId) {
      const apiUrl = process.env.REACT_APP_API_URL;  
      fetch(`${apiUrl}/product/reserveProduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          productId: productId,
          orderQuantity: orderQuantity,
          minimumOrder: minOrder,
          reservedCost: reservedCost,
        }),
      })
        .then(async (response) => {
          let responseModalText = '';
          const data = await response.json();
          
          if (response.ok) {
            responseModalText = t(data.message);
            setTimeout(() => {
              navigate(-3);
            }, 2000);
          } else {
            responseModalText = t(data.error);
            setTimeout(() => {
              setModalData({...modalData, isOpen: false})
            }, 2000);
          }
  
          setModalData({ isOpen: true, text: responseModalText });
        })
        .catch((error) => {
          console.error('Reservation error:', error);
        });
    }
  };
  
  return (
    <ScreenContainer subtitle={loggedUser?.username || ''} backButton>
        <ProductHeader name={name} image={image} />
        <RangeSlider value={orderQuantity} setValue={setOrderQuantity} min={minOrder} max={availability} />
        <Row
          label={t('COST')}
          value={`${orderCost} ${t('LEV')}`}
          type={'label'}
        />
        <Button title='Резервирай' onClick={() => handleReserveClick(id, orderQuantity, minOrder, orderCost, loggedUser?.id)} />
        <Modal isOpen={modalData.isOpen}>
          <h2 className="text-xl font-bold text-blue-800 text-center">{modalData.text}</h2>
        </Modal>
    </ScreenContainer>
  );
};

export default ReserveScreen;
