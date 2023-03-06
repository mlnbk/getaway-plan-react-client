import { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useLocation, useNavigate } from 'react-router-dom';

import { userStore } from '@Stores/UserStore';
import Button from '@Components/Generic/Button';

const BaseHeader: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoginButton, setShowLoginButton] = useState(true);

  useEffect(() => {
    if (location.pathname.includes('login')) setShowLoginButton(() => false);
  }, [location.pathname, showLoginButton]);

  return (
    <header
      data-testid={'header'}
      className="
        header
        sticky
        grid
        justify-items-center
        bg-GPmid2 dark:bg-GPlightGreen bg-opacity-30 dark:bg-opacity-50
        border-b-2 border-GPmid2 dark:border-GPlightGreen border-opacity-50 dark:border-opacity-50
        p-3 h-full w-full"
    >
      <div className="grid grid-cols-2 justify-items-center w-full md:w-[80%] lg:w-[70%]">
        <button
          data-testid={'logo'}
          className="justify-self-start"
          onClick={() => navigate('/home')}
        >
          <img
            className="hidden dark:block max-h-10"
            src="/GP-logo-transparent-light.png"
          />
          <img
            className="block dark:hidden max-h-10"
            src="/GP-logo-transparent-brown.png"
          />
        </button>
        {userStore.authenticated ? (
          <button
            onClick={() => navigate('profile/me')}
            className="avatar justify-self-end"
          >
            <div className="w-10 md:w-12 rounded-full border-2 border-GPlightGreen dark:border-GPlightBrown">
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
      </div>
    </header>
  );
};

const Header = observer(BaseHeader);
export default Header;
