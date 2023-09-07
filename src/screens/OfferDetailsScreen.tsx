import { useNavigate, useParams } from 'react-router-dom';
import ScreenContainer from '../components/ScreenContainer';
import Row from '../components/Row';
import { Product } from '../interfaces/interfaces';
import { useSelector } from 'react-redux';
import Button from '../components/Buttons';
import ProductHeader from '../components/ProductHeader';

const OfferDetailsScreen = () => {
  const { id } = useParams();
  
  const products = useSelector((state: any) => state.products);
  
  const selectedProduct: Product = products.find((product: Product) => product.id === id);
  const { 
    name = '', 
    cost = 0, 
    place = '', 
    image = '', 
    availability = 0, 
    minOrder = 0, 
    additionalInformation = ''
  } = selectedProduct || {};

  const navigate = useNavigate();

  const handleReserveClick = () => {
      navigate(`/offer/${id}/reserve`);
  };

  return (
    <ScreenContainer subtitle='Random Randomov' backButton>
      {selectedProduct ? (
        <div className='mt-2'>
          <ProductHeader name={name} image={image} />
          <div className="grid grid-cols-1 gap-4 mt-5">
            <Row
              label="Име"
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
    </ScreenContainer>
  );
};

export default OfferDetailsScreen;
