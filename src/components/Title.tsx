import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface TitleProps {
  subTitle: string;
  backButton?: boolean;
}

const Title: React.FC<TitleProps> = ({ subTitle, backButton }) => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-customGray border-b rounded-b-2xl">
      <div className="flex items-center py-2 px-5">
        {backButton && <FontAwesomeIcon icon={faArrowLeft} className="text-white mr-2 mt-1" onClick={() => handleGoBack()}/>}
        <h1 className="title mx-auto">Зеленчукова борса</h1>
      </div>
      <div className="flex items-center justify-center pb-5 px-5">
        <FontAwesomeIcon icon={faUser} className="text-white mr-2"/>
        <h1 className="title">{subTitle}</h1>
      </div>
    </div>
  );
};

export default Title;
