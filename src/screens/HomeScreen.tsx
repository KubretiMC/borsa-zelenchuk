import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { DecodedToken, RootState } from '../interfaces/interfaces';
import { fetchProductFilters, fetchProducts, fetchUsers, logoutUser } from '../redux/actions';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import jwtDecode from 'jwt-decode';
import _isEqual from 'lodash/isEqual';
import Modal from '../components/Modal';

const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
    
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUser = useSelector((state: RootState) => state.loggedUser);

  const token = localStorage.getItem('authToken');
  const [modalData, setModalData] = useState<{ isOpen: boolean; text: string }>({ isOpen: false, text: '' });
  const loggedUserRef = useRef({
    id: '',
    username: '',
    phoneNumber: ''
  });

  const handleNavigateButtonClick = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logoutUser())
    handleNavigateButtonClick('/');
  }
  
  useEffect(() => {
    if (!_isEqual(loggedUserRef.current, loggedUser)) {
      if(loggedUser) {
        loggedUserRef.current = loggedUser; 
      }
      const checkTokenExpiration = () => {
        const token = localStorage.getItem('authToken');
        if (token) {
          const decodedToken: DecodedToken = jwtDecode(token);
          const currentTime = Math.floor(Date.now() / 1000);
    
          if (decodedToken.exp < currentTime) {
            setModalData({ isOpen: true, text: t('SESSION_EXPIRED') });
            setTimeout(() =>{
              navigate('/');
            }, 2000)
          } else {
            return decodedToken.userId;
          }
        } else {
          setModalData({ isOpen: true, text: t('ERROR_OCCURED') });
          setTimeout(() =>{
            navigate('/');
          }, 2000)
        }
      }

      const userId = checkTokenExpiration();
      if(userId) {
        const apiUrl = process.env.REACT_APP_API_URL;   
        
        const getAllUsers = async () => {
          try {
            const response = await fetch(`${apiUrl}/user/getAllUsers`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            });

            if (response.ok) {
              const data = await response.json();
              dispatch(fetchUsers(data, userId));
            }
          } catch (error) {
            console.error('Error:', error);
          }
        }

        const getAllProducts = async () => {
          try { 
            const response = await fetch(`${apiUrl}/product/getAllProducts`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            });

            if (response.ok) {
              const data = await response.json();
              dispatch(fetchProducts(data));
            };
          } catch (error) {
            console.error('Error:', error);
          }
        }

        const getAllProductFilters = async () => {
          try { 
            const response = await fetch(`${apiUrl}/productFilters/getProductFilters`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            });

            if (response.ok) {
              const data = await response.json();
              dispatch(fetchProductFilters(data));
            };
          } catch (error) {
            console.error('Error:', error);
          }
        }

        getAllUsers();
        getAllProducts();
        getAllProductFilters();
      }
    }
  }, [loggedUser, dispatch, navigate, t, token]);

  return (
    <ScreenContainer subtitle={loggedUser?.username || ''}>
      <div className="flex flex-col justify-center items-center h-full">
        <Button
          title={t('OFFER_SEARCH')}
          onClick={() => handleNavigateButtonClick('/offers')}
        />
        <Button title={t('OFFER_MAKE')} onClick={() => handleNavigateButtonClick('/add-offer')} />
        <Button title={t('LOGOUT')} onClick={() => handleLogout()} />
      </div>
      <Modal isOpen={modalData.isOpen}>
          <h2 className="text-xl font-bold text-blue-800 text-center">{modalData.text}</h2>
      </Modal>
    </ScreenContainer>
  );
};

export default HomeScreen;
