import { FC } from 'react';
import { ClipLoader } from 'react-spinners';
import { useQuery } from 'react-query';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { uiStore } from '@Stores/UIStore';
import { userStore } from '@Stores/UserStore';

import Button from '@Components/Generic/Button';

const BaseProfile: FC = () => {
  const navigate = useNavigate();
  const { isFetching } = useQuery('profile', async () => {
    return userStore.getProfile();
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
        className="card w-80 md:w-100 bg-GPmid dark:bg-GPlightGreen shadow"
      >
        <div className="card-body text-GPdark2 dark:text-GPlight">
          <div className="avatar self-center p-2">
            <div className="w-24 rounded-full">
              <img
                src={`data:image/png;base64,${userStore.user?.profilePic}`}
                alt="Profile picture"
              />
            </div>
          </div>
          <h2 data-testid={'card-title'} className="card-title">
            Name
          </h2>
          <h2 className="card-description capitalize">
            {userStore.user?.name}
          </h2>
          <h2 data-testid={'card-title'} className="card-title">
            Email
          </h2>
          <h2 className="card-description">{userStore.user?.email}</h2>
          <h2 data-testid={'card-title'} className="card-title">
            Roles
          </h2>
          <h2 className="card-description">
            {userStore.user?.roles?.join(', ')}
          </h2>
        </div>
      </div>
      <Button label={'Logout'} onClick={handleLogout} />
    </div>
  );
};

const Profile = observer(BaseProfile);
export default Profile;
