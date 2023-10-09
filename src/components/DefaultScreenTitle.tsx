import React from 'react';
import { useTranslation } from 'react-i18next';

interface DefaultScreenTitleProps {
  text: string;
}

const DefaultScreenTitle: React.FC<DefaultScreenTitleProps> = ({ text }) => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <div>
        <label className='text-3xl font-bold'>{t('APP_NAME')}</label>
      </div>
      <div className='mb-5 mt-3'>
        <label className='text-lg text-gray-600 font-bold'>{text}</label>
      </div>
    </div>
  );
};

export default DefaultScreenTitle;
