import React from 'react';
import { useTranslation } from 'react-i18next';
import LoginForm from '../components/LoginForm';
import DefaultScreenTitle from '../components/DefaultScreenTitle';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { LOGIN_TO_CONTINUE } from '../constants/constants';

const LoginScreen: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="mainWrapper">
      <LanguageSwitcher textColor='text-black'/>
      <DefaultScreenTitle text={t(LOGIN_TO_CONTINUE)} />
      <LoginForm registration={false} />
    </div>
  );
};

export default LoginScreen;
