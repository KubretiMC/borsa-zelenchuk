import React from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  onClose?: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Success Modal"
      className="bg-gray-200 rounded-lg p-4 mx-auto max-w-md w-full flex flex-col items-center justify-center mx-8"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-700"
    >
      <h2 className="text-xl font-bold text-blue-800">Offer added successfully!</h2>
    </ReactModal>
  );
};

export default Modal;
