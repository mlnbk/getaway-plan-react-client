import { FC } from 'react';

import { upcomingTrips } from './mockData';

import Footer from './Components/Footer';
import Header from './Components/Header';
import TripCard from './Components/TripCard';

const App: FC = () => {
  return (
    <div className="App grid gap-3 grid-flow-row grid-rows-[auto_1fr_auto] justify-items-center w-full min-h-screen px-3">
      <Header />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-3 h-full w-full md:w-[85%] lg:w-[75%]">
        {upcomingTrips.map(
          ({ cardPicture, description, destination, title }) => {
            return (
              <TripCard
                cardPicture={cardPicture}
                description={description}
                destination={destination}
                title={title}
              />
            );
          },
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
