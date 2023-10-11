import React, { useEffect, useState } from 'react';
import Switch from "react-switch";
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  textColor?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ textColor }) => {
  const [isEnglish, setIsEnglish] = useState(true);
  const { i18n } = useTranslation(); 

  useEffect(() => {
    const selectedLanguage = localStorage.getItem('language') as string;
    setIsEnglish(selectedLanguage === 'en' ? true : false);
    i18n.changeLanguage(selectedLanguage);
  }, [i18n])

  const toggleLanguage = () => {
    const selectedLanguage = !isEnglish ? 'en' : 'bg';
    localStorage.setItem('language', selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    setIsEnglish((prevIsEnglish) => !prevIsEnglish);
  };

  return (
    <div className="absolute top-0 right-0 mt-4 mr-4">
        <label className="flex items-center space-x-2 text-white">
        <span className={textColor}>EN</span>
        <Switch
            onChange={toggleLanguage}
            checked={!isEnglish}
            uncheckedIcon={false}
            checkedIcon={false}
            height={20}
            width={40}
            handleDiameter={20}
            offColor="#888"
            onColor="#3498db"
        />
        <span className={textColor}>БГ</span>
        </label>
    </div>
  );
};

export default LanguageSwitcher;
