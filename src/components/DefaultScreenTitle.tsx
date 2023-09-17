import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface DefaultScreenTitleProps {
  text: string;
}

const DefaultScreenTitle: React.FC<DefaultScreenTitleProps> = ({ text }) => {
  return (
    <div className="text-center">
      <div>
        <label className='text-3xl font-bold'>Борса зеленчук</label>
      </div>
      <div className='mb-5 mt-3'>
        <label className='text-lg text-gray-600 font-bold'>{text}</label>
      </div>
    </div>
  );
};

export default DefaultScreenTitle;
