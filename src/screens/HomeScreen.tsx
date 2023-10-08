import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../interfaces/interfaces';
import { fetchProducts, fetchUsers, logoutUser } from '../redux/actions';
import { LOGOUT, OFFER_MAKE, OFFER_SEARCH } from '../constants/constants';

const HomeScreen: React.FC = () => {
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
          title={OFFER_SEARCH}
          onClick={() => handleNavigateButtonClick('/offers')}
        />
        <Button title={OFFER_MAKE} onClick={() => handleNavigateButtonClick('/add-offer')} />
        <Button title={LOGOUT} onClick={() => handleLogout()} />
      </div>
    </ScreenContainer>
  );
};

export default HomeScreen;
