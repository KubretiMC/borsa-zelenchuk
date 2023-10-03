import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScreenContainer from '../components/ScreenContainer';
import Row from '../components/Row';
import Button from '../components/Button';
import { addProductLoggedUser } from '../redux/actions';
import { OfferErrors, OfferValues, RootState, User } from '../interfaces/interfaces';
import Modal from '../components/Modal';
import { ADD_IMAGE, AVAILABILITY, COST, FIELD_REQUIRED, IMAGE, IMAGE_ADD, IMAGE_CHANGE, INFO, OFFER_MIN, NAME, OFERR_ADD, OFFER_ADDED_SUCCESSFULLY, PLACE, REQUIRED } from '../constants/constants';

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

    const handleAddOfferClick = async (offer: OfferValues, loggedUser?: User) => {
        if (loggedUser) {
            try {
                const response = await fetch('http://localhost:3001/api/product/addProduct',  {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: loggedUser.id, product: offer }),
                });

                if (response.ok) {
                    const data = await response.json();
                    const { productId = '' } = data;
                    dispatch(addProductLoggedUser(loggedUser, productId));
                    setIsModalOpened(true);
                } else {
                    // Handle the error if the request is not successful
                    console.error('Error:', response.statusText);
                }
            } catch (error) {
            console.error('Error:', error);
            }
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
                // image: reader.result as string,
                image: "https://trud.bg/public/images/articles/2015-05/image__4754527--4754232_3580228130795270688_big.jpg"
                });
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const validateForm = () => {
        const newErrors : Partial<OfferErrors> = {};
    
        if (!offerValues.cost || isNaN(offerValues.cost as number)) {
            newErrors.cost = FIELD_REQUIRED;
        }

        if (!offerValues.availability || isNaN(offerValues.cost as number)) {
            newErrors.availability = FIELD_REQUIRED;
        }
    
        if (!offerValues.minOrder || isNaN(offerValues.cost as number)) {
            newErrors.minOrder = FIELD_REQUIRED;
        }

        if (!offerValues.image) {
            newErrors.image = ADD_IMAGE;
        }
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
      };

      const handleSubmit = (e: any) => {
        e.preventDefault();
      
        if (validateForm()) {
          handleAddOfferClick(offerValues, loggedUser);
        }
      };

    return (
        <ScreenContainer subtitle={loggedUser?.username || ''} backButton>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 mt-5">
                    <Row
                        label={NAME}
                        value="name"
                        filterValues={offerValues}
                        handleInputChange={handleInputChange}
                        options={[...productFilters.names]}
                        type={'select'}
                    />
                    <Row
                        label={`${COST}${REQUIRED}`}
                        value="cost"
                        filterValues={offerValues}
                        handleInputChange={handleInputChange}
                        type={'number'}
                        error={errors.cost}
                    />
                    <Row
                        label={`${AVAILABILITY}${REQUIRED}`}
                        value="availability"
                        filterValues={offerValues}
                        handleInputChange={handleInputChange}
                        type={'number'}
                        error={errors.availability}
                    />
                    <Row
                        label={`${OFFER_MIN}${REQUIRED}`}
                        value="minOrder"
                        filterValues={offerValues}
                        handleInputChange={handleInputChange}
                        type={'number'}
                        error={errors.minOrder}
                    />
                    <Row
                        label={`${PLACE}${REQUIRED}`}
                        value="place"
                        filterValues={offerValues}
                        handleInputChange={handleInputChange}
                        options={[...productFilters.places]}
                        type={'select'}
                    />
                    <Row
                        label={INFO}
                        value="additionalInformation"
                        filterValues={offerValues}
                        handleInputChange={handleInputChange}
                    />
                    <div className="flex items-center input-select-wrapper">
                        <label className={`mr-6 w-20 text-left ${errors.image && 'pb-7'}`} htmlFor="imageUpload">
                            {IMAGE}
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
                                    <span className="flex-none text-sm text-gray-400">{offerValues.image ? IMAGE_CHANGE : IMAGE_ADD}</span>
                                </div>
                                {errors.image && <p className="text-red-500">{errors.image}</p>}
                            </label>            
                        </div>
                    </div>
                    {offerValues.image && 
                        <img src={offerValues.image} alt=''/>
                    }
                </div>
                <Button title={OFERR_ADD} submit />
                <Modal isOpen={isModalOpened}>
                    <h2 className="text-xl font-bold text-blue-800 text-center">{OFFER_ADDED_SUCCESSFULLY}</h2>
                </Modal>
            </form>
        </ScreenContainer>
    );
};

export default AddOfferScreen;
