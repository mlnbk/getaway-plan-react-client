import { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useLocation, useNavigate } from 'react-router-dom';

import { userStore } from '../Stores/UserStore';

import Button from './Button';

const BaseHeader: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoginButton, setShowLoginButton] = useState(true);

  useEffect(() => {
    if (location.pathname.includes('login')) setShowLoginButton(false);
  }, [location]);

  return (
    <header className="header sticky grid grid-cols-3 items-center p-3 h-full w-full md:w-[85%] lg:w-[75%]">
      <div className="justify-self-start">
        <img
          className="hidden dark:block max-h-10"
          src="/GP-logo-transparent-brown.png"
        />
        <img
          className="block dark:hidden max-h-10"
          src="/GP-logo-transparent-green.png"
        />
      </div>
      <div></div>
      {userStore.authenticated ? (
        <button
          onClick={() => navigate('profile/me')}
          className="avatar justify-self-end"
        >
          <div className="w-8 rounded-full">
            <img
              src={`data:image/png;base64,${userStore.user?.profilePic}`}
              alt="Profile picture"
            />
          </div>
        </button>
      ) : (
        showLoginButton && (
          <Button
            className="justify-self-end"
            label={'Login'}
            onClick={() => navigate('/login')}
          />
        )
      )}
    </header>
  );
};

const Header = observer(BaseHeader);
export default Header;
