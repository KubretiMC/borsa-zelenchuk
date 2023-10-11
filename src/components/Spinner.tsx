import React from 'react';
import { Grid } from 'react-loader-spinner';

const Spinner: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-10 z-50">
        <Grid height={80} width={80} color="blue" ariaLabel="loading" />
    </div>
  );
};

export default Spinner;
