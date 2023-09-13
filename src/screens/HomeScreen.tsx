import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import { useSelector } from 'react-redux';
import { RootState, User } from '../interfaces/interfaces';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateButtonClick = (path: string) => {
    navigate(path);
  };

  const loggedUser = useSelector((state: RootState) => state.loggedUser);

  return (
    <ScreenContainer subtitle={loggedUser?.username || 'Random Randomov'}>
      <div className="flex flex-col justify-center items-center h-full">
        <Button
          title='Търси оферта'
          onClick={() => handleNavigateButtonClick('/offers')}
        />
        <Button title='Направи оферта' onClick={() => handleNavigateButtonClick('/add-offer')} />
        <Button title='Излез оферта' onClick={undefined} />
      </div>
    </ScreenContainer>
  );
};

export default HomeScreen;
