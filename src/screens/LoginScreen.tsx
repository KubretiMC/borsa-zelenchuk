import React from 'react';
import LoginForm from '../components/LoginForm';

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
    </div>
  );
};

export default LoginScreen;