import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { uiStore } from '@Stores/UIStore';

import Error from '@Components/Specific/Error';
import Footer from '@Components/Specific/Footer';
import Header from '@Components/Specific/Header';

const BaseApp: FC = () => {
  return (
    <div
      data-testid={'app'}
      className={`${uiStore.darkMode && 'dark'} select-none`}
    >
      <div
        className="
          grid gap-12 grid-flow-row grid-rows-[auto_1fr_auto]
          justify-items-center items-center
          w-full min-h-screen
          bg-GPlight dark:bg-bgBaseDark"
      >
        <ErrorBoundary FallbackComponent={Error}>
          <Header />
          <Outlet />
        </ErrorBoundary>
        <Footer />
      </div>
    </div>
  );
};

const App = observer(BaseApp);
export default App;
