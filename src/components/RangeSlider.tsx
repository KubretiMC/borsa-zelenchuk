import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';

interface RangeSliderProps {
  value: number;
  setValue: (value: any) => void;
  min: number;
  max: number;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ value, setValue, min, max }) => {
  const { t } = useTranslation();

  const [modalData, setModalData] = useState<{ isOpen: boolean; text: string }>({ isOpen: false, text: '' });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const newValue = inputValue === '' ? '' : Number(inputValue);
    setValue(newValue);
  };

  useEffect(() => {
    if(modalData.isOpen) {
      setTimeout(() => {
        setModalData({ text: '', isOpen: false})
      }, 2000);
    }
  }, [modalData])

  const handleIncrement = () => {
    if(value < max) {
      setValue(value + 1);
    } else {
      setModalData({ isOpen: true, text: t('AVAILABILITY_MAX_LIMIT') });
    }
  };

  const handleDecrement = () => {
    if(value > min) {
      setValue(value - 1);
    } else {
      setModalData({ isOpen: true, text: t('AVAILABILITY_MIN_LIMIT') });
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
        <label className='mx-1'>{value} {t('KG')}</label>
        <FontAwesomeIcon icon={faPlus} onClick={handleIncrement}/>
      </div>
      <Modal isOpen={modalData.isOpen}>
          <h2 className="text-xl font-bold text-blue-800 text-center">{modalData.text}</h2>
      </Modal>
    </div>
  );
};

export default RangeSlider;
