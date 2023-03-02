import { FC } from 'react';
import { ClipLoader } from 'react-spinners';
import { useQuery } from 'react-query';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { User } from '../types';
import { uiStore } from '../Stores/UIStore';
import { userStore } from '../Stores/UserStore';
import { apiService } from '../Utils/APIService';

import Button from '../Components/Button';

const BaseProfile: FC = () => {
  const navigate = useNavigate();
  const { data, isFetching } = useQuery<User>('profile', async () => {
    return apiService.get('user/me');
  });

  const handleLogout = () => {
    userStore.logout();
    navigate('/login');
  };

  if (isFetching) {
    return (
      <ClipLoader
        data-testid="loader"
        color={uiStore.spinnerColor}
        className="justify-center justify-self-center"
      />
    );
  }

  return (
    <div className="grid gap-12 justify-items-center">
      <div
        data-testid={'profile-page'}
        className="card w-80 md:w-100 bg-GPmid dark:bg-GPlightGreen shadow-xl"
      >
        <div className="card-body text-GPdark2 dark:text-GPlight">
          <div className="avatar self-center p-2">
            <div className="w-24 rounded-full">
              <img
                src={`data:image/png;base64,${data?.profilePic}`}
                alt="Profile picture"
              />
            </div>
          </div>
          <h2 data-testid={'card-title'} className="card-title">
            Name
          </h2>
          <h2 className="card-description capitalize">{data?.name}</h2>
          <h2 data-testid={'card-title'} className="card-title">
            Email
          </h2>
          <h2 className="card-description">{data?.email}</h2>
          <h2 data-testid={'card-title'} className="card-title">
            Roles
          </h2>
          <h2 className="card-description">{data?.roles?.join(', ')}</h2>
        </div>
      </div>
      <Button label={'Logout'} onClick={handleLogout} />
    </div>
  );
};

const Profile = observer(BaseProfile);
export default Profile;
