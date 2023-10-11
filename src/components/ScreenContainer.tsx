import React, { ReactNode, useEffect, useState } from 'react';
import Title from './Title';
import LanguageSwitcher from './LanguageSwitcher';
import { fetchProducts, fetchUsers } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { DecodedToken, RootState } from '../interfaces/interfaces';
import jwtDecode from 'jwt-decode';
import Modal from './Modal';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface ScreenContainerProps {
  children: ReactNode;
  subtitle: string;
  backButton?: boolean;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({ subtitle, children, backButton }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state: RootState) => state.loggedUser);
  const [modalData, setModalData] = useState<{ isOpen: boolean; text: string }>({ isOpen: false, text: '' });

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
  
  useEffect(() => {
    if(!loggedUser?.id) {
      const userId = checkTokenExpiration();
      if(userId) {
        const apiUrl = process.env.REACT_APP_API_URL;   
        
        const getAllUsers = async () => {
          try {
            const response = await fetch(`${apiUrl}/user/getAllUsers`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
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

        getAllUsers();
        getAllProducts();
      }
    }
  }, [dispatch]);
  
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
