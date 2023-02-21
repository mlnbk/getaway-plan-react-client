import { FC } from 'react';

import { upcomingTrips } from '../mockData';

import TripCard from '../Components/TripCard';

const Home: FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-3 h-full w-full md:w-[85%] lg:w-[75%]">
      {upcomingTrips.map(({ cardPicture, description, destination, title }) => {
        return (
          <TripCard
            cardPicture={cardPicture}
            description={description}
            destination={destination}
            title={title}
          />
        );
      })}
    </div>
  );
};

export default Home;
