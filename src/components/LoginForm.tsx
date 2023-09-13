import React, { useState } from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logUser } from '../redux/actions';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSuccessfulLogin = () => {
    navigate(`/home`);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = () => {
    if (formData.username === 'admin' || 'admin2' && formData.password === 'admin' || 'admin2') {
        dispatch(logUser(formData.username, formData.password));
        handleSuccessfulLogin();
    } else {
        alert('Невалидно име или парола. Моля опитайте отново');
    }
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
        <Button title={'Влез'} onClick={handleLogin} />
        <div className="mt-4 text-right">
            <label className="text-gray-400 text-sm">
                Забравена парола?
            </label>
        </div>
    </div>
  );
};

export default LoginForm;