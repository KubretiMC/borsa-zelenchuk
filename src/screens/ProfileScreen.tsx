import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenContainer from '../components/ScreenContainer';
import { useSelector } from 'react-redux';
import { RootState, User } from '../interfaces/interfaces';

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateButtonClick = (path: string) => {
    navigate(path);
  };

  const loggedUser = useSelector((state: RootState) => state.loggedUser);

  return (
    <ScreenContainer subtitle={loggedUser?.username || 'Random Randomov'} backButton>
     
    </ScreenContainer>
  );
};

export default ProfileScreen;
