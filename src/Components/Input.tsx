import { FC, ReactNode } from 'react';

interface InputProperties {
  name: string;
  type?: string;
  register?: any;
  icon: ReactNode;
}

const Input: FC<InputProperties> = ({ icon, name, register, type }) => {
  return (
    <>
      <input
        {...register(name)}
        type={type ?? 'text'}
        className="
          w-full p-2 mb-4
          border
          text-sm
          focus:text-GPdark2
          dark:text-white dark:text-opacity-80 focus:dark:text-opacity-100
          dark:bg-opacity-0
          border-GPdark dark:border-GPlight
          bg-GPmid1 dark:bg-GPmid2 
          rounded-md outline-none
          transition duration-150 ease-in-out"
      />
      <div className="flex justify-end">{icon}</div>
    </>
  );
};

export default Input;
