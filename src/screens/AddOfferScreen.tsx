import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScreenContainer from '../components/ScreenContainer';
import Row from '../components/Row';
import Button from '../components/Button';
import { OfferErrors, OfferValues, RootState, User } from '../interfaces/interfaces';
import Modal from '../components/Modal';
import { useTranslation } from 'react-i18next';
import Spinner from '../components/Spinner';

const AddOfferScreen: React.FC = () => {
    const { t } = useTranslation();
    const productFilters = useSelector((state: RootState) => state.productFilters);
    const loggedUser = useSelector((state: RootState) => state.loggedUser);

    const navigate = useNavigate();

    const [modalData, setModalData] = useState<{ isOpen: boolean; text: string }>({ isOpen: false, text: '' });

    const [loading, setLoading] = useState(false);

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
                setLoading(true);
                
                const token = localStorage.getItem('authToken');
                const apiUrl = process.env.REACT_APP_API_URL;          
                const response = await fetch(`${apiUrl}/product/addProduct`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ product: offer }),
                });
    
                if (response.ok) {
                    const data = await response.json();
                    const message = t(data.message);
                    setLoading(false);
                    setModalData({ isOpen: true, text: t(message) });
                } else {
                    setLoading(false);
                    setModalData({ isOpen: true, text: t('ERROR_OCCURED') });
                }
            } catch (error) {
                setModalData({ isOpen: true, text: t('ERROR_OCCURED') });
            } finally {
                setTimeout(() => {
                    navigate(-1);
                }, 2000);
            }
        }
    };
    
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
            newErrors.cost = t('FIELD_REQUIRED');
        }

        if (!offerValues.availability || isNaN(offerValues.cost as number)) {
            newErrors.availability = t('FIELD_REQUIRED');
        }
    
        if (!offerValues.minOrder || isNaN(offerValues.cost as number)) {
            newErrors.minOrder = t('FIELD_REQUIRED');
        }

        if (!offerValues.image) {
            newErrors.image = t('ADD_IMAGE');
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
            {loading && (
              <Spinner />
            )}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 mt-5">
                    <Row
                        label={t('NAME')}
                        value="name"
                        filterValues={offerValues}
                        handleInputChange={handleInputChange}
                        options={[...productFilters.names]}
                        type={'select'}
                    />
                    <Row
                        label={`${t('COST')}${t('REQUIRED')}`}
                        value="cost"
                        filterValues={offerValues}
                        handleInputChange={handleInputChange}
                        type={'number'}
                        error={errors.cost}
                    />
                    <Row
                        label={`${t('AVAILABILITY')}${t('REQUIRED')}`}
                        value="availability"
                        filterValues={offerValues}
                        handleInputChange={handleInputChange}
                        type={'number'}
                        error={errors.availability}
                    />
                    <Row
                        label={`${t('OFFER_MIN')}${t('REQUIRED')}`}
                        value="minOrder"
                        filterValues={offerValues}
                        handleInputChange={handleInputChange}
                        type={'number'}
                        error={errors.minOrder}
                    />
                    <Row
                        label={`${t('PLACE')}${t('REQUIRED')}`}
                        value="place"
                        filterValues={offerValues}
                        handleInputChange={handleInputChange}
                        options={[...productFilters.places]}
                        type={'select'}
                    />
                    <Row
                        label={t('INFO')}
                        value="additionalInformation"
                        filterValues={offerValues}
                        handleInputChange={handleInputChange}
                    />
                    <div className="flex items-center input-select-wrapper">
                        <label className={`mr-6 w-20 text-left ${errors.image && 'pb-7'}`} htmlFor="imageUpload">
                            {t('IMAGE')}
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
                                    <span className="flex-none text-sm text-gray-400">{offerValues.image ? t('IMAGE_CHANGE') : t('IMAGE_ADD')}</span>
                                </div>
                                {errors.image && <p className="text-red-500">{errors.image}</p>}
                            </label>            
                        </div>
                    </div>
                    {offerValues.image && 
                        <img src={offerValues.image} alt=''/>
                    }
                </div>
                <Button title={t('OFFER_ADD')} submit />
                <Modal isOpen={modalData.isOpen}>
                    <h2 className="text-xl font-bold text-blue-800 text-center">{modalData.text}</h2>
                </Modal>
            </form>
        </ScreenContainer>
    );
};

export default AddOfferScreen;
