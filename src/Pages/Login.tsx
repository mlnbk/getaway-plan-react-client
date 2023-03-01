import { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Lock, Mail } from 'react-feather';

import { userStore } from '../Stores/UserStore';
import { uiStore } from '../Stores/UIStore';

import Button from '../Components/Button';
import Form from '../Components/Form';
import Input from '../Components/Input';

const Login: FC = () => {
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

  return (
    <>
      <div
        className="
        grid py-10 px-12
        rounded-lg shadow-xl
        w-80
        bg-GPmid1 dark:bg-GPmid2
        bg-opacity-50 dark:bg-opacity-50
        text-GPdark dark:text-GPlight"
      >
        <div className="box mb-3">
          <img
            className="hidden dark:block"
            src="/GP-logo-transparent-brown.png"
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
    </>
  );
};

export default Login;
