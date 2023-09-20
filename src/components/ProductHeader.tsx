import React from 'react';

interface ProductHeaderProps {
  name: string;
  image: string;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ name, image }) => {
  return (
    <div className="mt-2">
      <div className="my-2">
        <label className="text-center font-bold">{name}</label>
      </div>
      <img
        src={image}
        alt='description'
        className='w-full h-56'
      />
    </div>
  );
};

export default ProductHeader;
