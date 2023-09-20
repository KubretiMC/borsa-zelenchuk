import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface ButtonProps {
  title: string;
  icon?: IconDefinition;
  className?: string;
  submit?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, icon, className, submit = false, onClick }) => {
  return (
    <button className={`${className ? className : 'btn'}`} onClick={onClick} type={submit ? 'submit' : 'button'}>
      <div className="flex items-center justify-center">
        {icon && <FontAwesomeIcon icon={icon} className={'mr-2'} />}
        <span className="flex-none">{title}</span>
      </div>
    </button>
  );
};

export default Button;
