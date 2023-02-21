import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { User } from 'react-feather';

import { uiStore } from '../Stores/UIStore';

const BaseHeader: FC = () => {
  return (
    <header className="header sticky grid grid-cols-3 items-center p-3 h-full w-full md:w-[85%] lg:w-[75%]">
      <div className="text-GPdark2 dark:text-GPlight justify-self-start">
        GetawayPlan
      </div>
      <div className="text-GPdark2 dark:text-GPlight justify-self-center">
        Home
      </div>
      {/* NOTE: temporary solution */}
      <label className="label cursor-pointer justify-self-end">
        <span className="label-text text-GPdark2 dark:text-GPlight  px-2">
          Dark mode
        </span>
        <input
          type="checkbox"
          className="toggle"
          checked={uiStore.darkMode}
          onChange={uiStore.toggleDarkMode}
        />
      </label>
      {/* <div className="avatar justify-self-end">
        <div className="rounded-full">
          <User size={24} />
        </div>
      </div> */}
    </header>
  );
};

const Header = observer(BaseHeader);
export default Header;
