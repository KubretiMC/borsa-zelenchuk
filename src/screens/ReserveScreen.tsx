import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import ScreenContainer from '../components/ScreenContainer';
import { Product, RootState } from '../interfaces/interfaces';
import ProductHeader from '../components/ProductHeader';
import Row from '../components/Row';
import RangeSlider from '../components/RangeSlider';
import Button from '../components/Button';
import { reserveProduct } from '../redux/actions';
import Modal from '../components/Modal';


const ReserveScreen = () => {
  const { id = '' } = useParams();

  const dispatch = useDispatch();
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

  const handleReserveClick = (productId: string, orderQuantity: number, minOrder: number, userId?: string) => {
    if(userId) {
      dispatch(reserveProduct(userId, productId, orderQuantity, minOrder));
      setIsModalOpened(true);
    }
  };

  return (
    <ScreenContainer subtitle={loggedUser?.username || ''} backButton>
        <ProductHeader name={name} image={image} />
        <RangeSlider value={orderQuantity} setValue={setOrderQuantity} min={minOrder} max={availability} />
        <Row
          label="Цена"
          value={`${orderCost} лв.`}
          type={'label'}
        />
        <Button title='Резервирай' onClick={() => handleReserveClick(id, orderQuantity, minOrder, loggedUser?.id)} />
        <Modal isOpen={isModalOpened}>
          <h2 className="text-xl font-bold text-blue-800 text-center">Продукта е резервиран успешно!</h2>
        </Modal>
    </ScreenContainer>
  );
};

export default ReserveScreen;
