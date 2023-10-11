import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../interfaces/interfaces';
import { logoutUser } from '../redux/actions';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';

const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
    
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUser = useSelector((state: RootState) => state.loggedUser);

  const handleNavigateButtonClick = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logoutUser())
    handleNavigateButtonClick('/');
  }

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
