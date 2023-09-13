import React from 'react';
import LoginForm from '../components/LoginForm';
import loginIcon from '../images/loginIcon.svg';
import loginIcon2 from '../images/loginIcon2.svg';

const LoginScreen: React.FC = () => {
  return (
    <div className="mainWrapper">
      <div className="text-center">
        <div>
          <label className='text-3xl font-bold'>Борса зеленчук</label>
        </div>
        <div className='mb-5 mt-3'>
          <label className='text-lg text-gray-600 font-bold'>Влезте за да продължите</label>
        </div>
      </div>
      <LoginForm />
      <img
        src={loginIcon}
        alt="Login Icon"
        className="mx-auto mt-4 z-0"
      />
    </div>
  );
};

export default LoginScreen;