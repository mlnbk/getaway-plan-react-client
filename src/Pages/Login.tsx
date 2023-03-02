import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Lock, Mail } from 'react-feather';

import { userStore } from '../Stores/UserStore';
import { uiStore } from '../Stores/UIStore';

import Button from '../Components/Button';
import DarkModeButton from '../Components/DarkModeButton';
import Form from '../Components/Form';
import Footer from '../Components/Footer';
import Input from '../Components/Input';

const BaseLogin: FC = () => {
  const navigate = useNavigate();
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
    } catch (error) {
      toast.error(String(error));
    }
    if (userStore.authenticated) {
      navigate('/home');
      toast.success(`Welcome, ${userStore.user?.name}!`);
    }
    setIsAuthenticating(false);
  };

  useEffect(() => {
    userStore.logout();
  }, []);

  return (
    <div className={`${uiStore.darkMode && 'dark'}`}>
      <div
        className="
          grid gap-3 grid-flow-row grid-rows-[1fr_auto]
          justify-items-center items-center
          w-full h-screen px-3
          bg-cover bg-center
          bg-mountain-green bg-opacity-50"
      >
        <DarkModeButton />
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
            <div className="box">
              <Form onSubmit={onSubmit}>
                <div className="font-medium">Email</div>
                <Input
                  name="email"
                  icon={
                    <Mail className="h-6 -mt-14 pr-2 text-GPdark dark:text-GPlight opacity-50 pointer-events-none" />
                  }
                />
                <div className="font-medium">Password</div>
                <Input
                  name="password"
                  type="password"
                  icon={
                    <Lock className="h-6 -mt-14 pr-2 text-GPdark dark:text-GPlight opacity-50 pointer-events-none" />
                  }
                />
                <Button
                  className="justify-self-center"
                  label={'Login'}
                  type={'submit'}
                />
              </Form>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

const Login = observer(BaseLogin);
export default Login;
