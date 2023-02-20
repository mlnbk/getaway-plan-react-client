import { FC } from 'react';
import { User } from 'react-feather';

const Header: FC = () => {
  return (
    <header className="header sticky grid grid-cols-3 items-center p-3 h-full w-full md:w-[85%] lg:w-[75%]">
      <div className="justify-self-start">GetawayPlan</div>
      <div className="justify-self-center">Home</div>
      <div className="avatar justify-self-end">
        <div className="rounded-full">
          <User size={24} />
        </div>
      </div>
    </header>
  );
};

export default Header;
