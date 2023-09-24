import React from 'react';
import LoginForm from '../components/LoginForm';
import DefaultScreenTitle from '../components/DefaultScreenTitle';
import { REGISTRATION } from '../constants/constants';

const RegistrationScreen: React.FC = () => {
  return (
    <div className="mainWrapper">
      <DefaultScreenTitle text={REGISTRATION} />
      <LoginForm registration={true} />
    </div>
  );
};

export default RegistrationScreen;