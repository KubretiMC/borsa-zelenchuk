import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScreenContainer from '../components/ScreenContainer';
import Row from '../components/Row';
import Button from '../components/Button';
import { OfferErrors, OfferValues, ProductFilter, RootState, User } from '../interfaces/interfaces';
import Modal from '../components/Modal';
import { useTranslation } from 'react-i18next';
import Spinner from '../components/Spinner';
import { findKeyByTranslation } from '../utils/utils';
import bgTranslation from './../locales/bg.json';
import enTranslation from './../locales/en.json';

const AddOfferScreen: React.FC = () => {
    const { t, i18n } = useTranslation();
    const productFilters = useSelector((state: RootState) => state.productFilters);
    const loggedUser = useSelector((state: RootState) => state.loggedUser);

    const navigate = useNavigate();

    const [modalData, setModalData] = useState<{ isOpen: boolean; text: string }>({ isOpen: false, text: '' });

    const [loading, setLoading] = useState(false);

    const [offerValues, setOfferValues] = useState<OfferValues>({
        name: '',
        cost: undefined,
        availability: undefined,
        minOrder: undefined,
        place: '',
        image: '',
        additionalInformation: ''
    });
    const [productFiltersTranslated, setProductFiltersTranslated] = useState<ProductFilter>({
        names: [],
        places: [],
      });

    const [errors, setErrors] = useState<Partial<OfferErrors>>({
        cost: '',
        availability: '',
        minOrder: '',
        image: '',
      });

      
    const translateProductFilters = useCallback(() => {
        const { names = [], places = [] } = productFilters;
    
        // Translate the values in names and places arrays
        const translatedNames = names.map(name => t(name));
        const translatedPlaces = places.map(place => t(place));
    
        setProductFiltersTranslated({
        names: translatedNames,
        places: translatedPlaces,
        });
    }, [productFilters, t]);

    useEffect(() => {
        translateProductFilters();
      }, [productFilters, t]);
    console.log('111111');
    useEffect(() => {
        const { names = [], places = [] } = productFilters;
        const { name, cost, place, availability, minOrder, image, additionalInformation} = offerValues;

        // when we change the language, we get the key of the value
        const originalKeyName = findKeyByTranslation(i18n.language === 'bg' ? enTranslation : bgTranslation, name) as string;
        const originalKeyPlace = findKeyByTranslation(i18n.language === 'bg' ? enTranslation : bgTranslation, place) as string;

        // initial value is the first from productFilters, after that when we change the language we translate the selected value
        const offerName = name ? t(originalKeyName) : t(names[0]);
        const ooferPlace = place ? t(originalKeyPlace) : t(places[0]);

        // initial value is empty, after that we set the last selected value
        const offerCost = cost ? cost : undefined;
        const offerAvailability = availability ? availability : undefined;
        const oferMinOrder = minOrder ? minOrder : undefined;
        const offerImage = image ? image : '';
        const offerAdditionalInformation = additionalInformation ? additionalInformation : '';

        const translatedofferValues: OfferValues = {
            name: offerName,
            cost: offerCost,
            availability: offerAvailability,
            minOrder: oferMinOrder,
            place: ooferPlace,
            image: offerImage,
            additionalInformation: offerAdditionalInformation
        };
        setOfferValues(translatedofferValues);
    }, [productFilters, i18n.language]);

    const handleAddOfferClick = async (offer: OfferValues, loggedUser?: User) => {
        const originalKeyName = findKeyByTranslation(i18n.language === 'bg' ? bgTranslation : enTranslation, offer.name);
        const originalKeyPlace = findKeyByTranslation(i18n.language === 'bg' ? bgTranslation : enTranslation, offer.place);
        const offerValuesBody = {...offer, name: originalKeyName, place: originalKeyPlace };

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
                    body: JSON.stringify({ product: offerValuesBody }),
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
                        options={[...productFiltersTranslated.names]}
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
                        options={[...productFiltersTranslated.places]}
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
