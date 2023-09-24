import React from 'react';
import { APP_NAME } from '../constants/constants';

interface DefaultScreenTitleProps {
  text: string;
}

const DefaultScreenTitle: React.FC<DefaultScreenTitleProps> = ({ text }) => {
  return (
    <div className="text-center">
      <div>
        <label className='text-3xl font-bold'>{APP_NAME}</label>
      </div>
      <div className='mb-5 mt-3'>
        <label className='text-lg text-gray-600 font-bold'>{text}</label>
      </div>
    </div>
  );
};

export default DefaultScreenTitle;
