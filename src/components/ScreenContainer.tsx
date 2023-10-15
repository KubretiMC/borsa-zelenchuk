import React, { ReactNode, useEffect, useRef, useState } from 'react';
import Title from './Title';
import LanguageSwitcher from './LanguageSwitcher';
import { fetchProductFilters, fetchProducts, fetchUsers } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { DecodedToken, RootState } from '../interfaces/interfaces';
import jwtDecode from 'jwt-decode';
import Modal from './Modal';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import _isEqual from 'lodash/isEqual';

interface ScreenContainerProps {
  children: ReactNode;
  subtitle: string;
  backButton?: boolean;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({ subtitle, children, backButton }) => {
  return (
    <div className="mainWrapper">
      <div className="wrapper">
       <LanguageSwitcher />
        <Title subTitle={subtitle} backButton={backButton} />
        <div className='px-5 h-screen'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ScreenContainer;
