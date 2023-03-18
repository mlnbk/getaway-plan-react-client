import { FC, ReactNode, useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';

interface InputProperties {
  icon?: ReactNode;
  isTextArea?: boolean;
  label?: string;
  name: string;
  placeholder?: string;
  optional?: boolean;
  register?: any;
  type?: string;
}

const Input: FC<InputProperties> = ({
  icon,
  isTextArea,
  label,
  name,
  register,
  placeholder,
  optional,
  type,
}) => {
  const [open, setIsOpen] = useState<boolean>(false);

  if (isTextArea) {
    return (
      <>
        {label && optional && (
          <div className={`flex gap-1 ${!open && 'py-2'}`}>
            <p>{label}</p>
            {open ? (
              <button type="button" onClick={() => setIsOpen(false)}>
                <ChevronUp className="w-6 h-6" />
              </button>
            ) : (
              <button type="button" onClick={() => setIsOpen(true)}>
                <ChevronDown className="w-6 h-6" />
              </button>
            )}
          </div>
        )}
        {(!optional || open) && (
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
        )}
      </>
    );
  }

  return (
    <div className="">
      {label && optional && (
        <div className={`flex gap-1 ${!open && 'py-2'}`}>
          <p>{label}</p>
          {open ? (
            <button type="button" onClick={() => setIsOpen(false)}>
              <ChevronUp className="w-6 h-6" />
            </button>
          ) : (
            <button type="button" onClick={() => setIsOpen(true)}>
              <ChevronDown className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
      {(!optional || open) && (
        <>
          <input
            {...(register ? register() : {})}
            type={type ?? 'text'}
            data-testid={`textbox-${name}`}
            placeholder={placeholder}
            className="
            w-full h-full p-2
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
      )}
    </div>
  );
};

export default Input;
