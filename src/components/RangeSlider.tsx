import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

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
    if(value <= max) {
      setValue(value + 1);
    } else {
      alert("Не може да изберете над максималната стойност!")
    }
  };

  const handleDecrement = () => {
    if(value >= min) {
      setValue(value - 1);
    } else {
      alert("Не може да изберете под минималната стойност!")
    }
  };

  return (
    <div className="mb-5">
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
        <FontAwesomeIcon icon={faMinus} onClick={handleDecrement} />
        <label className='mx-1'>{value} кг.</label>
        <FontAwesomeIcon icon={faPlus} onClick={handleIncrement}/>
      </div>
    </div>
  );
};

export default RangeSlider;
