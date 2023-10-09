import React from 'react';
import LoginForm from '../components/LoginForm';
import DefaultScreenTitle from '../components/DefaultScreenTitle';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const RegistrationScreen: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="mainWrapper">
      <LanguageSwitcher textColor='text-black'/>
      <DefaultScreenTitle text={t('REGISTRATION')} />
      <LoginForm registration={true} />
    </div>
  );
};

export default RegistrationScreen;