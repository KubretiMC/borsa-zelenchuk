import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../interfaces/interfaces';
import { fetchProducts, fetchUsers, logoutUser } from '../redux/actions';
import { LOGOUT, OFFER_SEARCH } from '../constants/constants';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUser = useSelector((state: RootState) => state.loggedUser);
  const { t } = useTranslation();

  const handleNavigateButtonClick = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logoutUser())
    handleNavigateButtonClick('/');
  }

  useEffect(() => {
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
          dispatch(fetchUsers(data));
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
  }, [dispatch]);

  return (
    <ScreenContainer subtitle={loggedUser?.username || ''}>
      <div className="flex flex-col justify-center items-center h-full">
        <Button
          title={t(OFFER_SEARCH)} // Translate the text using the t function
          onClick={() => handleNavigateButtonClick('/offers')}
        />
        <Button title={t('OFFER_MAKE')} onClick={() => handleNavigateButtonClick('/add-offer')} />
        <Button title={t(LOGOUT)} onClick={() => handleLogout()} />
      </div>
    </ScreenContainer>
  );
};

export default HomeScreen;
