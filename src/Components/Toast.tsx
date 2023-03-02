import { FC } from 'react';
import { Toaster } from 'react-hot-toast';

const ToastNotification: FC = () => {
  return (
    <Toaster
      position="top-left"
      toastOptions={{
        duration: 5000,
        className: 'text-lg !bg-GPmid !dark:bg-GPmid2',
        error: {
          className: '!bg-rose-100',
        },
        success: {
          className: '!bg-green-100',
        },
      }}
    />
  );
};

export default ToastNotification;
