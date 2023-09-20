import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScreenContainer from '../components/ScreenContainer';
import Row from '../components/Row';
import Button from '../components/Button';
import { addProduct } from '../redux/actions';
import { OfferErrors, OfferValues, RootState } from '../interfaces/interfaces';
import Modal from '../components/Modal';

const AddOfferScreen: React.FC = () => {
    const productFilters = useSelector((state: RootState) => state.productFilters);
    const loggedUser = useSelector((state: RootState) => state.loggedUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isModalOpened, setIsModalOpened] = useState(false);

    const { names = [], places = [] } = productFilters;
    const initialOfferValues: OfferValues = {
        name: names[0],
        cost: undefined,
        availability: undefined,
        minOrder: undefined,
        place: places[0],
        image: '',
        additionalInformation: ''
    };

    const [offerValues, setOfferValues] = useState(initialOfferValues);

    const [errors, setErrors] = useState<Partial<OfferErrors>>({
        cost: '',
        availability: '',
        minOrder: '',
        image: '',
      });

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
    }, [isModalOpened, navigate]);

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
                setOfferValues({
                ...offerValues,
                image: reader.result as string,
                });
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const validateForm = () => {
        const newErrors : Partial<OfferErrors> = {};
    
        if (!offerValues.cost || isNaN(offerValues.cost as number)) {
            newErrors.cost = 'Въведете цена';
        }

        if (!offerValues.availability || isNaN(offerValues.cost as number)) {
            newErrors.availability = 'Въведете наличност';
        }
    
        if (!offerValues.minOrder || isNaN(offerValues.cost as number)) {
            newErrors.minOrder = 'Въведете минимална поръчка';
        }

        if (!offerValues.image) {
            newErrors.image = 'Качете снимка';
        }
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
      };

      const handleSubmit = (e: any) => {
        e.preventDefault();
      
        if (validateForm()) {
          handleAddOfferClick(offerValues, loggedUser?.id);
        }
      };
    
    return (
        <ScreenContainer subtitle={loggedUser?.username || ''} backButton>
            <form onSubmit={handleSubmit}>
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
                        error={errors.cost}
                    />
                    <Row
                        label="Наличност"
                        value="availability"
                        filterValues={offerValues}
                        handleInputChange={handleInputChange}
                        type={'number'}
                        error={errors.availability}
                    />
                    <Row
                        label="Минимална поръчка"
                        value="minOrder"
                        filterValues={offerValues}
                        handleInputChange={handleInputChange}
                        type={'number'}
                        error={errors.minOrder}
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
                        <label className={`mr-6 w-20 text-left ${errors.image && 'pb-7'}`} htmlFor="imageUpload">
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
                                {errors.image && <p className="text-red-500">{errors.image}</p>}
                            </label>            
                        </div>
                    </div>
                    {offerValues.image && 
                        <img src={offerValues.image} alt=''/>
                    }
                </div>
                <Button title='Добави оферта' submit />
                <Modal isOpen={isModalOpened}>
                    <h2 className="text-xl font-bold text-blue-800 text-center">Офертата е добавена успешно!</h2>
                </Modal>
            </form>
        </ScreenContainer>
    );
};

export default AddOfferScreen;
