import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

import { uiStore } from './Stores/UIStore';

import DarkModeButton from './Components/DarkModeButton';
import Footer from './Components/Footer';
import Header from './Components/Header';

const BaseApp: FC = () => {
  return (
    <div data-testid={'app'} className={`${uiStore.darkMode && 'dark'}`}>
      <DarkModeButton />
      <div
        className="
          grid gap-3 grid-flow-row grid-rows-[auto_1fr_auto]
          justify-items-center items-center
          w-full min-h-screen px-3
          bg-GPlight dark:bg-GPdark"
      >
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

const App = observer(BaseApp);
export default App;
