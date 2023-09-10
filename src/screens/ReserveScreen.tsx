import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ScreenContainer from '../components/ScreenContainer';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../interfaces/interfaces';
import ProductHeader from '../components/ProductHeader';
import Row from '../components/Row';
import RangeSlider from '../components/RangeSlider';
import Button from '../components/Buttons';
import { reserveProduct } from '../redux/actions';


const ReserveScreen = () => {
  const { id = '' } = useParams();

  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products);
  const state = useSelector((state: any) => state);
  console.log('state', state);

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

  useEffect(() => {
    setOrderCost(orderQuantity*cost);
  }, [cost, minOrder, orderQuantity]);

  const handleReserveClick = (productId: string, orderQuantity: number) => {
    dispatch(reserveProduct(productId, orderQuantity));
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
        <Button title='Резервирай' onClick={() => handleReserveClick(id, orderQuantity)} />
    </ScreenContainer>
  );
};

export default ReserveScreen;
