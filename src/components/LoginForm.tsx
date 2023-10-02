import React, { useState } from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../redux/actions';
import { User, UserErrors } from '../interfaces/interfaces';
import { PASSWORD_CONFIRM, FIELD_REQUIRED, INVALID_CREDENTIALS, LOGIN, LOGIN_TEXT, PASSWORD, PASSWORD_NOT_MATCH, REGISTRATION, REGISTRATION_TEXT, USERNAME, USERNAME_TAKEN, PHONE_NUMBER } from '../constants/constants';

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
    alert(INVALID_CREDENTIALS);
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

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
    // if (validateForm()) {
  //     registration ? 
  //     handleRegistration(
  //       formData.username, 
  //       formData.password, 
  //       formData.passwordConfirm ?? '', 
  //       formData.phoneNumber ?? '', 
  //       users
  //     ) : 
  //     handleLogin(formData.username, formData.password, users)
  //   }
  // };

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
  
      try {
        const response = await fetch('http://localhost:3001/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
        console.log('response', response);
        if (response.ok) {
          const data = await response.json();
          dispatch(registerUser({...data}));
          navigate('/home');
        } else {
          alert(USERNAME_TAKEN);
          console.error('Registration failed');
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
            <button className="text-gray-400 text-sm" onClick={() => handleNavigateButtonClick(registration)}>
                {registration ? LOGIN_TEXT : REGISTRATION_TEXT}
            </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;