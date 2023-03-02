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
    <header
      className="
        header
        sticky
        grid grid-cols-2
        items-center
        border-b-2 border-GPmid2 dark:border-GPlightGreen border-opacity-50 dark:border-opacity-50
        p-3 h-full w-full md:w-[85%] lg:w-[75%]"
    >
      <button className="justify-self-start" onClick={() => navigate('/home')}>
        <img
          className="hidden dark:block  max-h-10"
          src="/GP-logo-transparent-light-green.png"
        />
        <img
          className="block dark:hidden max-h-10"
          src="/GP-logo-transparent-green.png"
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
    </header>
  );
};

const Header = observer(BaseHeader);
export default Header;
