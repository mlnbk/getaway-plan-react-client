import { FC } from 'react';
import { observer } from 'mobx-react-lite';

import { userStore } from '../Stores/UserStore';
import { useQuery } from 'react-query';
import { User } from '../types';
import { apiService } from '../Utils/APIService';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const BaseHeader: FC = () => {
  const navigate = useNavigate();
  //NOTE temporary until login is in place
  const { data, isFetching } = useQuery<User>('profile', async () => {
    return apiService.get('user/me');
  });

  if (!isFetching) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    userStore.setUser(data!);
  }

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
        <Button className="justify-self-end" label={'Login'} />
      )}
    </header>
  );
};

const Header = observer(BaseHeader);
export default Header;
