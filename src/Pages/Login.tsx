import { FC, useEffect } from 'react';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';

import Input from '../Components/Input';
import Form from '../Components/Form';
import { ClipLoader } from 'react-spinners';
import { Lock, Mail } from 'react-feather';
import Button from '../Components/Button';

const onSubmit = async (data: any) => {
  if (!data.email || !data.password) {
    toast.error('Email and password must be provided!');
    return;
  }
  // await userStore.login({
  //   email: data.email.toLowerCase(),
  //   password: data.password,
  // });
  // if (userStore.authenticated) {
  //   navigate('/home');
  //   toast.success(`Welcome, ${userStore.user?.firstName}!`);
  // }
};
const Login: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // userStore.logout();
    navigate('/login');
  }, []);

  //   if (isFetching) {
  //     return (
  //       <ClipLoader
  //         data-testid="loader"
  //         color={uiStore.spinnerColor}
  //         className="justify-center justify-self-center"
  //       />
  //     );
  //   }

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
        {/* <NavLink
          to="/password-reset"
          className="text-blue-400 mt-6 -mb-6 text-center text-sm hover:drop-shadow-lg"
        >
          Reset password
        </NavLink> */}
      </div>
    </>
  );
};

export default Login;
