import { FC, ReactNode, useRef } from 'react';

interface ModalProperties {
  children: ReactNode;
  isOpen: boolean;
  title: string;
  onClose: () => void;
}

const Modal: FC<ModalProperties> = ({ children, isOpen, onClose, title }) => {
  const modalReference = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalReference.current && modalReference.current === event.target) {
      onClose();
    }
  };
  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full flex items-center justify-center z-50"
          onClick={handleClick}
        >
          <div className="modal modal-open" ref={modalReference}>
            <div className="modal-box relative bg-GPlight text-GPdark2 dark:bg-GPmodalBgDark dark:text-GPmodalTextDark">
              <button
                className="btn btn-sm btn-circle absolute right-4 top-4"
                onClick={onClose}
              >
                ✕
              </button>
              <h3 className="text-xl font-bold pr-10">{title}</h3>
              <div className="py-4">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
