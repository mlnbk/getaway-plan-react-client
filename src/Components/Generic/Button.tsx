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
  return (
    <button
      type={type}
      className={`
        py-2 px-auto
        rounded cursor-pointer
        font-bold text-sm items-center uppercase shadow-md
        bg-GPmid1 text-GPdark2 hover:bg-GPdark
        dark:bg-GPdarkBrown dark:text-GPlight dark:hover:bg-opacity-90
        hover:shadow-xl
        transition-all duration-200 ease-in-out
        disabled:cursor-default disabled:dark:hover:bg-opacity-100 disabled:hover:shadow-none disabled:hover:bg-GPmid1 disabled:dark:hover:bg-GPdarkBrown
        ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
