import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Moon, Sun } from 'react-feather';

import { uiStore } from '../Stores/UIStore';

const BaseDarkModeButton: FC = () => {
  return (
    <button
      data-testid={'dark-mode-button'}
      onClick={uiStore.toggleDarkMode}
      className="fixed top-20 left-4 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-primary-500 hover:bg-primary-600 transition-all duration-300 ease-in-out"
    >
      <div className="avatar">
        {uiStore.darkMode ? (
          <Moon
            data-testid={'dark-mode-button-icon'}
            className="bg-GPmid2 text-GPlight w-8 h-8 p-2 rounded-full shadow"
          />
        ) : (
          <Sun
            data-testid={'dark-mode-button-icon'}
            className="bg-GPmid1 text-GPdark2 w-8 h-8 p-2 rounded-full shadow"
          />
        )}
      </div>
    </button>
  );
};

const DarkModeButton = observer(BaseDarkModeButton);
export default DarkModeButton;
