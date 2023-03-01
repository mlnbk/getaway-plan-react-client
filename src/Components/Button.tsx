import { FC } from 'react';

type ButtonProperties = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

const Button: FC<ButtonProperties> = ({
  label,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
}) => {
  console.log(className);
  return (
    <button
      type={type}
      className={`
        w-[50%] py-2 px-4 
        rounded cursor-pointer
        font-bold text-sm uppercase shadow-md
        bg-GPmid2 text-GPdark2 hover:bg-GPdark
        dark:bg-GPdark2 dark:text-GPlight dark:hover:bg-opacity-90
        hover:shadow-xl
        transition-all duration-200 ease-in-out 
        ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
