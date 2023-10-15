import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../interfaces/interfaces';
import { fetchProductFilters, logoutUser } from '../redux/actions';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';

const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
    
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUser = useSelector((state: RootState) => state.loggedUser);

  const token = localStorage.getItem('authToken');

  const handleNavigateButtonClick = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logoutUser())
    handleNavigateButtonClick('/');
  }
  
  useEffect(() => {
    if (!loggedUser) {
        const apiUrl = process.env.REACT_APP_API_URL;   
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
        getAllProductFilters();
    }
  }, [loggedUser, dispatch, t, token]);

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
    </ScreenContainer>
  );
};

export default HomeScreen;
