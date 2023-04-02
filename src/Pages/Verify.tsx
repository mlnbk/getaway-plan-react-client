import { FC } from 'react';
import { useQuery } from 'react-query';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { uiStore } from '@Stores/UIStore';
import { userStore } from '@Stores/UserStore';

import Footer from '@Components/Specific/Footer';
import { ClipLoader } from 'react-spinners';

const Verify: FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const parameters = new URLSearchParams(search);
  const email = parameters.get('email');
  const token = parameters.get('token');

  let content = (
    <>
      <p>Oops!</p>
      <p className="text-base py-6">
        Invalid verify URL. <br /> Please try again!
      </p>
      <p className="text-sm">
        You will be redirected to the login page in 5 seconds.
      </p>
    </>
  );

  if (!email || !token) {
    setTimeout(() => {
      navigate('/login');
    }, 5000);
  } else {
    const { isLoading, data } = useQuery('verify', async () => {
      return userStore.verifyEmailToken(email, token);
    });
    if (isLoading) {
      content = (
        <ClipLoader
          data-testid="loader"
          color={uiStore.spinnerColor}
          className="place-self-center"
        />
      );
    } else {
      data &&
        toast.success('Successful email verification! You can login now.', {
          id: 'verify-success',
        });
      content = (
        <>
          <Navigate to={'/login'} />
        </>
      );
    }
  }

  return (
    <div
      data-testid={'verfiy-page'}
      className={`${uiStore.darkMode && 'dark'}`}
    >
      <div
        className="
          grid gap-3 grid-flow-row grid-rows-[1fr_auto]
          justify-items-center items-center
          w-full h-screen
          bg-cover bg-center
          bg-mountain-green bg-opacity-50"
      >
        <div
          className="
            grid py-10 px-12
            rounded-lg shadow-xl text-center text-3xl
            w-80
            bg-GPlightBrown dark:bg-GPdarkGreen
            bg-opacity-95 dark:bg-opacity-95
            text-GPdark dark:text-GPlight"
        >
          {content}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Verify;
