import React, { useState } from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions';
import { UserErrors } from '../interfaces/interfaces';
import { 
  PASSWORD_CONFIRM, 
  FIELD_REQUIRED, 
  LOGIN, 
  LOGIN_TEXT, 
  PASSWORD, 
  PASSWORD_NOT_MATCH, 
  REGISTRATION, 
  REGISTRATION_TEXT, 
  USERNAME, 
  PHONE_NUMBER 
} from '../constants/constants';

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
  const [errors, setErrors] = useState<Partial<UserErrors>>({
    username: '',
    password: '',
    passwordConfirm: '',
    phoneNumber: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const validateForm = () => {
    const newErrors : Partial<UserErrors> = {};

    if (!formData.username) {
        newErrors.username = FIELD_REQUIRED;
    }

    if (!formData.password) {
        newErrors.password = FIELD_REQUIRED;
    }

    if(registration) {
      if (!formData.passwordConfirm) {
        newErrors.passwordConfirm =  FIELD_REQUIRED;
      }

      if (!formData.phoneNumber) {
          newErrors.phoneNumber = FIELD_REQUIRED;
      }
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (registration && formData.password !== formData.passwordConfirm) {
        alert(PASSWORD_NOT_MATCH);
        return;
      }
      const requestBody = registration
      ? {
          username: formData.username,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
        }
      : {
          username: formData.username,
          password: formData.password,
        };

      const apiUrl = process.env.REACT_APP_API_URL;
      console.log('apiUrl', apiUrl);
      const requestUrl = registration ? 
        `${apiUrl}/user/register`
        :
        `${apiUrl}/user/login`
      console.log('requestUrl', requestUrl);
      try {
        const response = await fetch(requestUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
  
        if (response.ok) {
          const data = await response.json();
          dispatch(loginUser(data.id));
          navigate('/home');
        } else {
          const data = await response.json();
          const { error = '' } = data;
          alert(error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="bg-white py-8 px-4 rounded-lg shadow-xl border w-4/5 z-10">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <input
                type="text"
                id="username"
                name="username"
                className="border rounded border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={USERNAME}
                value={formData.username}
                onChange={handleInputChange}
            />
            {errors.username && <p className="flex text-left text-red-500">{errors.username}</p>}
        </div>
        <div className="mb-4">
            <input
                type="password"
                id="password"
                name="password"
                className="border rounded border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={PASSWORD}
                value={formData.password}
                onChange={handleInputChange}
            />
            {errors.password && <p className="flex text-left text-red-500">{errors.password}</p>}
        </div>
        {registration &&
          <>
            <div className="mb-4">
                <input
                    type="password"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    className="border rounded border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder={PASSWORD_CONFIRM}
                    value={formData.passwordConfirm}
                    onChange={handleInputChange}
                />
                {errors.passwordConfirm && <p className="flex text-left text-red-500">{errors.passwordConfirm}</p>}
            </div>
            <div className="mb-4">
                <input
                    type="number"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="border rounded border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder={PHONE_NUMBER}
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                />
                {errors.phoneNumber && <p className="flex text-left text-red-500">{errors.phoneNumber}</p>}
          </div>
        </>
        }
        <Button 
          title={registration ? REGISTRATION: LOGIN} 
          submit
        />
        <div className="mt-4 text-right">
            <button type='button' className="text-gray-400 text-sm" onClick={() => handleNavigateButtonClick(registration)}>
                {registration ? LOGIN_TEXT : REGISTRATION_TEXT}
            </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;