import React, { ReactNode } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children, className }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel="Success Modal"
      className={`${className ? className : 'bg-gray-200 rounded-lg p-4 mx-2 max-w-md w-full flex flex-col items-center justify-center mx-12'}`}
      overlayClassName="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-700"
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
