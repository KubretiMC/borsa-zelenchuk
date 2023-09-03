import React, { ReactNode } from 'react';
import Title from './Title';

interface ScreenContainerProps {
  children: ReactNode;
  subtitle: string;
  backButton?: boolean;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({ subtitle, children, backButton }) => {
  return (
    <div className="mainWrapper">
      <div className="wrapper">
        <Title subTitle={subtitle} backButton={backButton} />
        <div className='px-5 h-screen'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ScreenContainer;
