import { FC } from 'react';
import { observer } from 'mobx-react-lite';

import { userStore } from '../Stores/UserStore';
import { useQuery } from 'react-query';
import { User } from '../types';
import { apiService } from '../Utils/APIService';
import { useNavigate } from 'react-router-dom';

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
      <div className="text-GPdark2 dark:text-GPlight justify-self-start">
        GetawayPlan
      </div>
      <button
        onClick={() => navigate('home')}
        className="text-GPdark2 dark:text-GPlight justify-self-center"
      >
        Home
      </button>
      <button
        onClick={() => navigate('profile/me')}
        className="avatar justify-self-end"
      >
        <div className="w-8 rounded-full">
          <img
            src={`data:image/png;base64,${userStore.user.profilePic}`}
            alt="Profile picture"
          />
        </div>
      </button>
    </header>
  );
};

const Header = observer(BaseHeader);
export default Header;
