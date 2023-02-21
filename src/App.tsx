import { FC } from 'react';
import { observer } from 'mobx-react-lite';

import { uiStore } from './Stores/UIStore';

import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Pages/Home';

const BaseApp: FC = () => {
  return (
    <div className={`App ${uiStore.darkMode && 'dark'}`}>
      <div className="bg-GPlight dark:bg-GPdark grid gap-3 grid-flow-row grid-rows-[auto_1fr_auto] justify-items-center w-full min-h-screen px-3">
        <Header />
        <Home />
        <Footer />
      </div>
    </div>
  );
};

const App = observer(BaseApp);
export default App;
