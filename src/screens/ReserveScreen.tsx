import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import ScreenContainer from '../components/ScreenContainer';
import { Product } from '../interfaces/interfaces';
import ProductHeader from '../components/ProductHeader';
import Row from '../components/Row';
import RangeSlider from '../components/RangeSlider';
import Button from '../components/Buttons';
import { reserveProduct } from '../redux/actions';
import Modal from '../components/Modal';


const ReserveScreen = () => {
  const { id = '' } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state: any) => state.products);

  const selectedProduct: Product = products.find((product: Product) => product.id === id);
  const { 
    name = '', 
    cost = 0,  
    image = '', 
    availability = 0, 
    minOrder = 0, 
  } = selectedProduct || {};

  const [orderQuantity, setOrderQuantity] = useState<number>(minOrder);
  const [orderCost, setOrderCost] = useState<number>(cost*minOrder);
  const [isModalOpened, setIsModalOpened] = useState(false);

  useEffect(() => {
    setOrderCost(orderQuantity*cost);
  }, [cost, minOrder, orderQuantity]);

  useEffect(() => {
      if (isModalOpened) {
          setTimeout(() => {
              navigate(-3);
          }, 2000);
      }
  }, [isModalOpened]);

  const handleReserveClick = (productId: string, orderQuantity: number, minOrder: number) => {
    dispatch(reserveProduct(productId, orderQuantity, minOrder));
    setIsModalOpened(true);
  };

  return (
    <ScreenContainer subtitle='Random Randomov' backButton>
        <ProductHeader name={name} image={image} />
        <RangeSlider value={orderQuantity} setValue={setOrderQuantity} min={minOrder} max={availability} />
        <Row
          label="Цена"
          value={`${orderCost} лв.`}
          type={'label'}
        />
        <Button title='Резервирай' onClick={() => handleReserveClick(id, orderQuantity, minOrder)} />
        <Modal isOpen={isModalOpened} text="Продукта е резервиран успешно!" />
    </ScreenContainer>
  );
};

export default ReserveScreen;
