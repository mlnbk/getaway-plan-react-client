import { FC, MouseEventHandler, ReactNode } from 'react';

interface FloatingButtonProperties {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const FloatingButton: FC<FloatingButtonProperties> = ({
  children,
  onClick,
}) => {
  return (
    <button
      data-testid={'add-trip-mode-button'}
      onClick={onClick}
      className="fixed bottom-20 right-4 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-primary-500 hover:bg-primary-600 transition-all duration-300 ease-in-out"
    >
      <div className="avatar">{children}</div>
    </button>
  );
};

export default FloatingButton;
