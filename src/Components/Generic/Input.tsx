import { FC, ReactNode } from 'react';

interface InputProperties {
  icon?: ReactNode;
  isTextArea?: boolean;
  name: string;
  placeholder?: string;
  register?: any;
  type?: string;
}

const Input: FC<InputProperties> = ({
  icon,
  isTextArea,
  name,
  register,
  placeholder,
  type,
}) => {
  if (isTextArea) {
    return (
      <>
        <textarea
          {...(register ? register() : {})}
          type={type ?? 'text'}
          data-testid={`textbox-${name}`}
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
  }

  return (
    <>
      <input
        {...(register ? register() : {})}
        type={type ?? 'text'}
        data-testid={`textbox-${name}`}
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
