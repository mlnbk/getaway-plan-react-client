import { FC, ReactNode } from 'react';

interface InputProperties {
  icon?: ReactNode;
  name: string;
  placeholder?: string;
  register?: any;
  type?: string;
}

const Input: FC<InputProperties> = ({
  icon,
  name,
  register,
  placeholder,
  type,
}) => {
  return (
    <>
      <input
        {...(register ? register(name) : {})}
        type={type ?? 'text'}
        data-testid={'textbox'}
        placeholder={placeholder}
        className="
          w-full p-2 mb-4
          border
          text-sm
          focus:text-GPdark2
          dark:text-white dark:text-opacity-80 focus:dark:text-opacity-100
          dark:bg-opacity-0
          border-GPdark dark:border-GPlight
          bg-GPmid dark:bg-GPmid2 
          rounded-md outline-none
          transition duration-150 ease-in-out"
      />
      <div data-testid={'icon'} className="flex justify-end">
        {icon}
      </div>
    </>
  );
};

export default Input;
