import { FC } from 'react';
import Footer from './Components/Footer';
import Header from './Components/Header';

const App: FC = () => {
  return (
    <div className="App grid gap-3 grid-flow-row grid-rows-[auto_1fr_auto] justify-items-center w-full min-h-screen px-3">
      <Header />
      <div className="bg-blue-100 text-black rounded-lg p-3 h-full w-full md:w-[85%] lg:w-[75%]">
        Content
      </div>
      <Footer />
    </div>
  );
};

export default App;
