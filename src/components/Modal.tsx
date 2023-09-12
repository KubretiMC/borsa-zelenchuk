import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

interface ModalProps {
  isOpen: boolean;
  text: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, text }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel="Success Modal"
      className="bg-gray-200 rounded-lg p-4 mx-auto max-w-md w-full flex flex-col items-center justify-center mx-12"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-700"
    >
      <h2 className="text-xl font-bold text-blue-800 text-center">{text}</h2>
    </ReactModal>
  );
};

export default Modal;
