import React from 'react';

interface RangeSliderProps {
  value: number;
  setValue: (value: any) => void;
  min: number;
  max: number;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ value, setValue, min, max }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const newValue = inputValue === '' ? '' : Number(inputValue);
    setValue(newValue);
  };

  const handleIncrement = () => {
    setValue(value + 1);
  };

  const handleDecrement = () => {
    setValue(value - 1);
  };

  return (
    <div>
      <div>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
        />
      </div>
      <div>
        <button onClick={handleDecrement}>-</button>
        <label className='mx-1'>{value}</label>
        <button onClick={handleIncrement}>+</button>
      </div>
    </div>
  );
};

export default RangeSlider;
