import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate, Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { uiStore } from './Stores/UIStore';
import { userStore } from './Stores/UserStore';

import DarkModeButton from './Components/DarkModeButton';
import Error from './Components/Error';
import Footer from './Components/Footer';
import Header from './Components/Header';
import ToastNotification from './Components/Toast';

const BaseApp: FC = () => {
  return (
    <div data-testid={'app'} className={`${uiStore.darkMode && 'dark'}`}>
      <DarkModeButton />
      <ToastNotification />
      <div
        className="
          grid gap-12 grid-flow-row grid-rows-[auto_1fr_auto]
          justify-items-center items-center
          w-full min-h-screen px-3
          bg-GPlight dark:bg-bgBaseDark"
      >
        <ErrorBoundary FallbackComponent={Error}>
          <Header />
          {userStore.authenticated ? (
            <Outlet />
          ) : (
            <Navigate to="/login" replace />
          )}
        </ErrorBoundary>
        <Footer />
      </div>
    </div>
  );
};

const App = observer(BaseApp);
export default App;
