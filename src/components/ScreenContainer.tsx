import React, { ReactNode, useEffect, useRef, useState } from 'react';
import Title from './Title';
import LanguageSwitcher from './LanguageSwitcher';
import _isEqual from 'lodash/isEqual';
import { useDispatch, useSelector } from 'react-redux';
import { DecodedToken, RootState } from '../interfaces/interfaces';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router';
import { fetchProductFilters, fetchProducts, fetchUsers } from '../redux/actions';
import Modal from './Modal';
import { useTranslation } from 'react-i18next';

interface ScreenContainerProps {
  children: ReactNode;
  subtitle: string;
  backButton?: boolean;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({ subtitle, children, backButton }) => {
  const { t } = useTranslation();
  const state = useSelector((state: RootState) => state);
  console.log('state', state);
  const loggedUser = useSelector((state: RootState) => state.loggedUser);
  const token = localStorage.getItem('authToken');
  const [modalData, setModalData] = useState<{ isOpen: boolean; text: string }>({ isOpen: false, text: '' });
  const loggedUserRef = useRef({
    id: '',
    username: '',
    phoneNumber: ''
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('1111111111111', loggedUser);
    console.log('2222222222222', loggedUserRef.current); 
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
    <div className="mainWrapper">
      <div className="wrapper">
       <LanguageSwitcher />
        <Title subTitle={subtitle} backButton={backButton} />
        <div className='px-5 h-screen'>
          {children}
        </div>
      </div>
      <Modal isOpen={modalData.isOpen}>
          <h2 className="text-xl font-bold text-blue-800 text-center">{modalData.text}</h2>
      </Modal>
    </div>
  );
};

export default ScreenContainer;
