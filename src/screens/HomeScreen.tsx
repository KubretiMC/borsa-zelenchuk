import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../interfaces/interfaces';
import { logOutUser } from '../redux/actions';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigateButtonClick = (path: string) => {
    navigate(path);
  };

  const loggedUser = useSelector((state: RootState) => state.loggedUser);

  const handleLogout = () => {
    dispatch(logOutUser())
    handleNavigateButtonClick('/');
  }

  return (
    <ScreenContainer subtitle={loggedUser?.username || ''}>
      <div className="flex flex-col justify-center items-center h-full">
        <Button
          title='Търси оферта'
          onClick={() => handleNavigateButtonClick('/offers')}
        />
        <Button title='Направи оферта' onClick={() => handleNavigateButtonClick('/add-offer')} />
        <Button title='Излез' onClick={() => handleLogout()} />
      </div>
    </ScreenContainer>
  );
};

export default HomeScreen;
