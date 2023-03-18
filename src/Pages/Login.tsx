import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Lock, Mail } from 'react-feather';
import { useForm } from 'react-hook-form';

import { userStore } from '@Stores/UserStore';
import { uiStore } from '@Stores/UIStore';

import Button from '@Components/Generic/Button';
import Footer from '@Components/Specific/Footer';
import Input from '@Components/Generic/Input';

const BaseLogin: FC = () => {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm({});
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const onSubmit = async (data: any) => {
    if (!data.email || !data.password) {
      toast.error('Email and password must be provided!');
      return;
    }
    setIsAuthenticating(true);
    try {
      await userStore.login({
        email: data.email.toLowerCase(),
        password: data.password,
      });
      navigate('/home');
      toast.success(`Welcome, ${userStore.user?.name}!`);
    } catch (error) {
      toast.error(String(error));
    }
    setIsAuthenticating(false);
  };

  useEffect(() => {
    userStore.logout();
  }, []);

  return (
    <div data-testid={'login-page'} className={`${uiStore.darkMode && 'dark'}`}>
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
          rounded-lg shadow-xl
          w-80
          bg-GPlightBrown dark:bg-GPdarkGreen
          bg-opacity-95 dark:bg-opacity-95
          text-GPdark dark:text-GPlight"
        >
          <div className="box mb-3">
            <img
              className="hidden dark:block"
              src="/GP-logo-transparent-light.png"
            />
            <img
              className="block dark:hidden"
              src="/GP-logo-transparent-green.png"
            />
          </div>
          {isAuthenticating ? (
            <ClipLoader
              data-testid="loader"
              color={uiStore.spinnerColor}
              className="justify-center justify-self-center"
            />
          ) : (
            <form
              className="grid w-full mx-auto mt-8 mb-0 gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                name="email"
                label="Email"
                register={() => register('email')}
                icon={
                  <Mail className="h-5 w-5 text-GPdark dark:text-GPlight opacity-50 pointer-events-none" />
                }
              />
              <Input
                name="password"
                label="Password"
                type="password"
                register={() => register('password')}
                icon={
                  <Lock className="h-5 w-5 text-GPdark dark:text-GPlight opacity-50 pointer-events-none" />
                }
              />
              <Button
                className="justify-self-center mt-4"
                label={'Login'}
                type={'submit'}
              />
            </form>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

const Login = observer(BaseLogin);
export default Login;
