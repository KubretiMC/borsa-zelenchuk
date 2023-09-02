import React from 'react';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Buttons';

const HomeScreen: React.FC = () => {
  return (
    <ScreenContainer subtitle='Random Randomov'>
      <div className="flex flex-col items-center justify-center h-full px-10">
        <Button title='Търси оферта' onClick={undefined} />
        <Button title='Направи оферта' onClick={undefined} />
        <Button title='Излез оферта' onClick={undefined} />
      </div>
    </ScreenContainer>
  );
};

export default HomeScreen;
