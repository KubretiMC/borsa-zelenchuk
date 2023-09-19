import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScreenContainer from '../components/ScreenContainer';
import Row from '../components/Row';
import Button from '../components/Button';
import { addProduct } from '../redux/actions';
import { OfferValues, RootState } from '../interfaces/interfaces';
import Modal from '../components/Modal';

const AddOfferScreen: React.FC = () => {
    const productFilters = useSelector((state: RootState) => state.productFilters);
    const loggedUser = useSelector((state: RootState) => state.loggedUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isModalOpened, setIsModalOpened] = useState(false);

    const initialOfferValues: OfferValues = {
        name: 'Изберете продукт',
        cost: undefined,
        availability: undefined,
        minOrder: undefined,
        place: 'Всички',
        image: '',
        additionalInformation: ''
    };

    const [offerValues, setOfferValues] = useState(initialOfferValues);

    const handleAddOfferClick = (offer: OfferValues, userId?: string) => {
        if(userId){
            dispatch(addProduct(userId, offer));
            setIsModalOpened(true);
        }
    };

    useEffect(() => {
        if (isModalOpened) {
            setTimeout(() => {
                navigate(-1);
            }, 2000);
        }
    }, [isModalOpened]);

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
        <ScreenContainer subtitle={loggedUser?.username || ''} backButton>
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
                    type={'number'}
                />
                <Row
                    label="Наличност"
                    value="availability"
                    filterValues={offerValues}
                    handleInputChange={handleInputChange}
                    type={'number'}
                />
                <Row
                    label="Минимална поръчка"
                    value="minOrder"
                    filterValues={offerValues}
                    handleInputChange={handleInputChange}
                    type={'number'}
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
            <Button title='Добави оферта' onClick={() => handleAddOfferClick(offerValues, loggedUser?.id)} />
            <Modal isOpen={isModalOpened}>
                <h2 className="text-xl font-bold text-blue-800 text-center">Офертата е добавена успешно!</h2>
            </Modal>
        </ScreenContainer>
    );
};

export default AddOfferScreen;
