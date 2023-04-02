import { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ClipLoader } from 'react-spinners';
import { Lock, Mail } from 'react-feather';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { userStore } from '@Stores/UserStore';
import { uiStore } from '@Stores/UIStore';

import { passwordRegex, SignupFormValues } from '@types';

import Button from '@Components/Generic/Button';
import Footer from '@Components/Specific/Footer';
import Input from '@Components/Generic/Input';

const BaseSignup: FC = () => {
  const {
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignupFormValues>({ mode: 'all' });
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: SignupFormValues) => {
    setProcessing(true);
    try {
      const signupResult = await userStore.signUp({
        name: data.name,
        email: data.email.toLowerCase(),
        password: data.password,
      });
      if (signupResult) {
        setIsSuccess(true);
      }
    } catch (error) {
      toast.error(String(error));
    }
    setProcessing(false);
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
          bg-valley-purple bg-opacity-50"
      >
        <div
          className="
          grid py-10 px-12
          rounded-lg shadow-xl
          w-80 md:w-120
          bg-GPlightBrown dark:bg-GPdarkGreen
          bg-opacity-95 dark:bg-opacity-95
          text-GPdark dark:text-GPlight"
        >
          <div className="grid items-center mb-3">
            {isSuccess ? (
              <img
                className="hidden dark:block max-h-16 justify-self-center"
                src="/GP-logo-transparent-light.png"
              />
            ) : (
              <div className="flex items-center gap-3 md:gap-6 box mb-3">
                <img
                  className="hidden dark:block max-h-12"
                  src="/circle-logo-transparent-light.png"
                />
                <div className="font-medium text-2xl">Signup</div>
              </div>
            )}
          </div>
          {processing ? (
            <ClipLoader
              data-testid="loader"
              color={uiStore.spinnerColor}
              className="justify-center justify-self-center"
            />
          ) : isSuccess ? (
            <>
              <p className="text-center p-4 md:p-6 font-bold text-2xl">
                Nice to have you!
              </p>
              <p className="py-3">
                Please check your email inbox and follow the instructions in the
                confirmation email we just sent you.
              </p>
              <Button
                className="justify-self-center mt-4"
                label={'Login'}
                type={'submit'}
                onClick={() => navigate('/login')}
              />
            </>
          ) : (
            <>
              <form
                className="grid w-full mx-auto mt-8 mb-0 gap-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  name="name"
                  label="Name"
                  register={() =>
                    register('name', { required: true, minLength: 2 })
                  }
                />
                {errors.name && (
                  <p className="text-sm text-rose-500 -mt-4">
                    Please provide a valid name.
                  </p>
                )}
                <Input
                  name="email"
                  label="Email"
                  register={() =>
                    register('email', {
                      required: true,
                      pattern: /\S+@\S+\.\S+/,
                    })
                  }
                  icon={
                    <Mail className="h-5 w-5 text-GPdark dark:text-GPlight opacity-50 pointer-events-none" />
                  }
                />
                {errors.email && (
                  <p className="text-sm text-rose-500 -mt-4">
                    Please provide a valid email address.
                  </p>
                )}
                <Input
                  name="password"
                  type="password"
                  label="Password"
                  register={() =>
                    register('password', {
                      required: true,
                      minLength: 8,
                      pattern: passwordRegex,
                    })
                  }
                  icon={
                    <Lock className="h-5 w-5 text-GPdark dark:text-GPlight opacity-50 pointer-events-none" />
                  }
                />
                {errors.password && (
                  <p className="text-sm text-rose-500 -mt-4">
                    Your password have at least 8 characters, contain one number
                    and one special character.
                  </p>
                )}
                <Input
                  name="confirm"
                  label="Confirm password"
                  type="password"
                  register={() =>
                    register('confirm', {
                      validate: (value) => value === watch('password'),
                    })
                  }
                  icon={
                    <Lock className="h-5 w-5 text-GPdark dark:text-GPlight opacity-50 pointer-events-none" />
                  }
                />
                {errors.confirm && (
                  <p className="text-sm text-rose-500 -mt-4">
                    The provided passwords must match.
                  </p>
                )}
                <Button
                  className="justify-self-center mt-4"
                  label={'Signup'}
                  type={'submit'}
                />
              </form>
              <a href={`/login`} className="text-center text-sm pt-6 underline">
                Login
              </a>
            </>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

const Signup = observer(BaseSignup);
export default Signup;
