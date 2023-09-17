import React from 'react';
import LoginForm from '../components/LoginForm';
import DefaultScreenTitle from '../components/DefaultScreenTitle';

const RegistrationScreen: React.FC = () => {
  return (
    <div className="mainWrapper">
      <DefaultScreenTitle text={'Регистрация'} />
      <LoginForm registration={true} />
    </div>
  );
};

export default RegistrationScreen;