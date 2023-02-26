import { FC } from 'react';

const Profile: FC = () => {
  return (
    <div
      data-testid={'home-page'}
      className="grid grid-cols-2 md:grid-cols-3 gap-6 p-3 h-full w-full md:w-[85%] lg:w-[75%]"
    >
      me!
    </div>
  );
};

export default Profile;
