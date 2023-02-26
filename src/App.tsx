import { FC } from 'react';
import { observer } from 'mobx-react-lite';

import { uiStore } from './Stores/UIStore';

import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Pages/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import Profile from './Pages/Profile';

const BaseApp: FC = () => {
  return (
    <div data-testid={'app'} className={`${uiStore.darkMode && 'dark'}`}>
      <div className="bg-GPlight dark:bg-GPdark grid gap-3 grid-flow-row grid-rows-[auto_1fr_auto] justify-items-center w-full min-h-screen px-3">
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:user" element={<Profile />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

const App = observer(BaseApp);
export default App;
