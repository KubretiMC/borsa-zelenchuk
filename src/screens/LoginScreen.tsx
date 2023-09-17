import React from 'react';
import LoginForm from '../components/LoginForm';
import DefaultScreenTitle from '../components/DefaultScreenTitle';

const LoginScreen: React.FC = () => {
  return (
    <div className="mainWrapper">
      <DefaultScreenTitle text={'Влезте за да продължите'} />
      <LoginForm registration={false} />
    </div>
  );
};

export default LoginScreen;