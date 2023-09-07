import React, { useState } from 'react';
import ScreenContainer from '../components/ScreenContainer';
import Row from '../components/Row';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Buttons';
import { addProduct } from '../redux/actions';
import { OfferValues } from '../interfaces/interfaces';

const AddOfferScreen: React.FC = () => {
    const productFilters = useSelector((state: any) => state.productFilters);
    const dispatch = useDispatch();

    const handleAddOfferClick = (offer: OfferValues) => {
        dispatch(addProduct(offer));
    };
    
    const initialOfferValues: OfferValues = {
        name: 'Изберете продукт',
        cost: undefined,
        availability: undefined,
        minOrder: undefined,
        place: 'Всички',
        image: '',
        phoneNumber: undefined,
        additionalInformation: ''
    };

    const [offerValues, setOfferValues] = useState(initialOfferValues);
    console.log('offerValues', offerValues);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setOfferValues({
          ...offerValues,
          [name]: value,
        });
      };
    
      return (
        <ScreenContainer subtitle='Random Randomov' backButton>
            <div className="grid grid-cols-1 gap-4 mt-5">
                <Row
                    label="Име"
                    value="name"
                    filterValues={offerValues}
                    handleInputChange={handleInputChange}
                    options={[...productFilters.names]}
                    type={'select'}
                />
                <Row
                    label="Цена"
                    value="cost"
                    filterValues={offerValues}
                    handleInputChange={handleInputChange}
                    type={'inputNumber'}
                />
                <Row
                    label="Наличност"
                    value="availability"
                    filterValues={offerValues}
                    handleInputChange={handleInputChange}
                    type={'inputNumber'}
                />
                <Row
                    label="Минимална поръчка"
                    value="minOrder"
                    filterValues={offerValues}
                    handleInputChange={handleInputChange}
                    type={'inputNumber'}
                />
                <Row
                    label="Място"
                    value="place"
                    filterValues={offerValues}
                    handleInputChange={handleInputChange}
                    options={[...productFilters.places]}
                    type={'select'}
                />
                <Row
                    label="Телефонен номер"
                    value="phoneNumber"
                    filterValues={offerValues}
                    handleInputChange={handleInputChange}
                    type={'inputNumber'}
                />
                 <Row
                    label="Информация"
                    value="additionalInformation"
                    filterValues={offerValues}
                    handleInputChange={handleInputChange}
                />
            </div>
            <Button title='Добави оферта' onClick={() => handleAddOfferClick(offerValues)} />
        </ScreenContainer>
      );
};

export default AddOfferScreen;
