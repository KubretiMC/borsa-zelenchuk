import React from 'react';
import LoginForm from '../components/LoginForm';
import DefaultScreenTitle from '../components/DefaultScreenTitle';
import { LOGIN_TO_CONTINUE } from '../constants/constants';

const LoginScreen: React.FC = () => {
  return (
    <div className="mainWrapper">
      <DefaultScreenTitle text={LOGIN_TO_CONTINUE} />
      <LoginForm registration={false} />
    </div>
  );
};

export default LoginScreen;