import React, { useState } from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../redux/actions';
import { RootState, User } from '../interfaces/interfaces';

interface LoginFormProps {
  registration: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({registration}) => {
  const initialFormData = {
    username: '',
    password: '',
    ...(registration ? { passwordConfirm: '' } : {}),
    ...(registration ? { phoneNumber: '' } : {}),
  };

  const [formData, setFormData] = useState(initialFormData);

  const users = useSelector((state: RootState) => state.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSuccessfulLogin = () => {
    navigate(`/home`);
  };

  const handleNavigateButtonClick = (registration: boolean) => {
    navigate(registration ? `/` : 'registration');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = (username: string, password: string, users: User[]) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username && users[i].password === password) {
        dispatch(loginUser(username, password));
        handleSuccessfulLogin();
        return;
      }
    }
    alert('Невалидно име или парола. Моля опитайте отново');
  };

  const handleRegistration = (username: string, password: string, passwordConfirm: string, phoneNumber: string, users: User[]) => {
    if(password !== passwordConfirm) {
      alert('Паролите не съвпадат!');
      return;
    }

    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        alert('Потребителскто име е заето!');
        return;
      }
    }
    dispatch(registerUser(username, password, phoneNumber));
    handleSuccessfulLogin();
  };

  return (
    <div className="bg-white py-8 px-4 rounded-lg shadow-xl border w-4/5 z-10">
        <div className="mb-4">
            <input
                type="text"
                id="username"
                name="username"
                className="border rounded border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Потребителско име"
                value={formData.username}
                onChange={handleInputChange}
            />
        </div>
        <div className="mb-4">
            <input
                type="password"
                id="password"
                name="password"
                className="border rounded border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Парола"
                value={formData.password}
                onChange={handleInputChange}
            />
        </div>
        {registration &&
          <>
            <div className="mb-4">
                <input
                    type="password"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    className="border rounded border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Повторете паролата"
                    value={formData.passwordConfirm}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-4">
                <input
                    type="number"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="border rounded border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Телофонен номер"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                />
          </div>
        </>
        }
        <Button 
          title={registration ? 'Регистрация' : 'Влез'} 
          onClick={() => registration ? 
          handleRegistration(
            formData.username, 
            formData.password, 
            formData.passwordConfirm ?? '', 
            formData.phoneNumber ?? '', 
            users
          ) : 
          handleLogin(formData.username, formData.password, users)} />
        <div className="mt-4 text-right">
            <button className="text-gray-400 text-sm" onClick={() => handleNavigateButtonClick(registration)}>
                {registration ? 'Имате акаунт? Влезте!' : 'Нямате акаунт? Регистрация!'}
            </button>
        </div>
    </div>
  );
};

export default LoginForm;