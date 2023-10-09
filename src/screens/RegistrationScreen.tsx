import React from 'react';
import LoginForm from '../components/LoginForm';
import DefaultScreenTitle from '../components/DefaultScreenTitle';
import { REGISTRATION } from '../constants/constants';
import LanguageSwitcher from '../components/LanguageSwitcher';

const RegistrationScreen: React.FC = () => {
  return (
    <div className="mainWrapper">
      <LanguageSwitcher textColor='text-black'/>
      <DefaultScreenTitle text={REGISTRATION} />
      <LoginForm registration={true} />
    </div>
  );
};

export default RegistrationScreen;