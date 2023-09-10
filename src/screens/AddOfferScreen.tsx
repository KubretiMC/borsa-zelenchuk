import React, { useState } from 'react';
import ScreenContainer from '../components/ScreenContainer';
import Row from '../components/Row';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Buttons';
import { addProduct } from '../redux/actions';
import { OfferValues } from '../interfaces/interfaces';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setOfferValues({
          ...offerValues,
          [name]: value,
        });
      };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                console.log('reader.result', reader.result);
                setOfferValues({
                ...offerValues,
                image: reader.result as string,
                });
            };
            reader.readAsDataURL(selectedFile);
        }
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
                <div className="flex items-center input-select-wrapper">
                    <label className="mr-6 w-20 text-left" htmlFor="imageUpload">
                        Изображение
                    </label>
                    <div className={`flex-1`}>
                        <label className='cursor-pointer'>
                            <input
                                type='file'
                                accept='image/*'
                                style={{ display: 'none' }}
                                onChange={handleFileUpload}
                            />
                            <div className="image pt-1 flex items-center justify-center">
                                {<FontAwesomeIcon icon={faUpload} className={'mr-2 text-gray-400'} />}
                                <span className="flex-none text-sm text-gray-400">{offerValues.image ? "Смени изображение" : "Добавете Изображение"}</span>
                            </div>
                        </label>            
                    </div>
                </div>
                {offerValues.image && 
                    <img src={offerValues.image} alt=''/>
                }
            </div>
            <Button title='Добави оферта' onClick={() => handleAddOfferClick(offerValues)} />
        </ScreenContainer>
    );
};

export default AddOfferScreen;
