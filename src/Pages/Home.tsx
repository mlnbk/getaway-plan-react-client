import { FC, useState } from 'react';
import { useQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ClipLoader } from 'react-spinners';

import { GetTripsForUserResponse } from '@types';
import { tripStore } from '@Stores/TripStore';

import AddTripButton from '@Components/Specific/AddTripButton';
import TripCard from '@Components/Specific/TripCard';
import { uiStore } from '@Stores/UIStore';
import { queryClient } from 'index';

const Home: FC = () => {
  const [tripsState, setTripsStates] = useState<GetTripsForUserResponse>();
  const { isFetching } = useQuery('trips', async () => {
    const result = await tripStore.getTripsForUser({});
    setTripsStates(result);
    return result;
  });

  const fetchItem = async () => {
    try {
      const tripsResponse = await tripStore.getTripsForUser({
        skip: tripsState?.trips.length,
      });
      const fetchedTrips = tripsState?.trips ?? [];
      setTripsStates({
        trips: [...fetchedTrips, ...tripsResponse.trips],
        hasMore: tripsResponse.hasMore,
        total: tripsResponse.total,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (isFetching) {
    return (
      <ClipLoader
        data-testid="loader"
        color={uiStore.spinnerColor}
        className="justify-center justify-self-center"
      />
    );
  }

  return (
    <div
      data-testid={'home-page'}
      className="justify-items-center h-full w-full md:w-[80%] lg:w-[70%]"
    >
      <AddTripButton />
      <InfiniteScroll
        dataLength={tripsState?.trips.length ?? 0}
        next={fetchItem}
        hasMore={tripsState?.hasMore ?? true}
        loader={<h4>Loading...</h4>}
        refreshFunction={() => queryClient.invalidateQueries('trips')}
        endMessage={
          <p className="text-center">
            <b>You reached the end. Add more trips!</b>
          </p>
        }
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 className="text-center">&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 className="text-center">&#8593; Release to refresh</h3>
        }
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10 p-6"
      >
        {tripsState?.trips.map(({ description, destinations, name }, index) => {
          return (
            <TripCard
              key={index}
              // cardPicture={cardPicture}
              description={description}
              destinations={destinations}
              title={name}
            />
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default Home;
