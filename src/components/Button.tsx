import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface ButtonProps {
  title: string;
  onClick: any;
  icon?: IconDefinition;
  clasName?: string;
}

const Button: React.FC<ButtonProps> = ({ title, icon, onClick, clasName }) => {
  return (
    <button className={`${clasName ? 'clasName' : 'btn'}`} onClick={() => onClick()}>
      <div className="flex items-center justify-center">
        {icon && <FontAwesomeIcon icon={icon} className={'mr-2'} />}
        <span className="flex-none">{title}</span>
      </div>
    </button>
  );
};

export default Button;
