import { FC } from 'react';

import { upcomingTrips } from '../mockData';

import TripCard from '../Components/TripCard';

const Home: FC = () => {
  return (
    <div
      data-testid={'home-page'}
      className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10 p-6 h-full w-full md:w-[80%] lg:w-[70%]"
    >
      {upcomingTrips.map(
        ({ cardPicture, description, destination, title }, index) => {
          return (
            <TripCard
              key={index}
              cardPicture={cardPicture}
              description={description}
              destination={destination}
              title={title}
            />
          );
        },
      )}
    </div>
  );
};

export default Home;
