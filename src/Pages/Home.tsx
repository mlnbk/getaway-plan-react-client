import { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ClipLoader } from 'react-spinners';
import { Plus } from 'react-feather';
import { toast } from 'react-hot-toast';
import { observer } from 'mobx-react-lite';

import { queryClient } from 'index';

import { GetTripsForUserResponse } from '@types';

import { uiStore } from '@Stores/UIStore';
import { tripStore } from '@Stores/TripStore';

import Button from '@Components/Generic/Button';
import FloatingButton from '@Components/Generic/FloatingButton';
import Modal from '@Components/Generic/Modal';
import TripCard from '@Components/Specific/TripCard';

const BaseHome: FC = () => {
  const [tripsState, setTripsStates] = useState<GetTripsForUserResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const { isFetching } = useQuery('trips', async () => {
    const result = await tripStore.getTripsForUser({ limit: 15 });
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
        trips: [...fetchedTrips, ...tripsResponse?.trips],
        hasMore: tripsResponse?.hasMore,
        total: tripsResponse?.total,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    if (!uiStore.selectedTrip) return;
    const deleteTripResult = await tripStore.deleteTrip(uiStore.selectedTrip);
    if (deleteTripResult?.ok) {
      toast.success('Trip successfully deleted!');
      uiStore.setIsDeleteTripModalOpen(false);
      uiStore.setSelectedTrip();
    } else {
      toast.error('There was an error deleting your trip. Please try again!');
    }
    queryClient.invalidateQueries({ queryKey: ['trips'] });
    setIsLoading(false);
  };

  useEffect(() => {
    uiStore.setSelectedTrip();
  });

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
      className="grid justify-items-center h-full w-full md:w-[80%] lg:w-[70%]"
    >
      <Modal
        title={'Are you sure you want to delete your trip?'}
        isOpen={uiStore.isDeleteTripModalOpen}
        onClose={() => uiStore.setIsDeleteTripModalOpen(false)}
      >
        <div className="grid gap-6 justify-items-center">
          {isLoading ? (
            <ClipLoader
              data-testid="loader"
              color={uiStore.spinnerColor}
              className="place-self-center m-6"
            />
          ) : (
            <>
              <p>This action cannot be undone!</p>
              <Button label="Delete" onClick={handleDelete} />
            </>
          )}
        </div>
      </Modal>
      <FloatingButton onClick={() => uiStore.setIsAddTripModalOpen(true)}>
        <Plus className="bg-GPdarkGreen dark:bg-GPdarkBrown text-GPlightBrown dark:text-GPlight w-10 h-10 p-2 rounded-full shadow-lg" />
      </FloatingButton>
      <InfiniteScroll
        dataLength={tripsState?.trips.length ?? 0}
        next={fetchItem}
        hasMore={tripsState?.hasMore ?? true}
        loader={<h4>Loading...</h4>}
        refreshFunction={() => queryClient.invalidateQueries('trips')}
        endMessage={
          <p className="text-center mt-8">
            <b>No trips to see here... Add more trips!</b>
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
        className="grid grid-cols-1"
      >
        <div className="columns-2 md:columns-3 lg:columns-4 px-3">
          {tripsState?.trips.map(
            ({ _id, description, destinations, name, pictures }, index) => {
              return (
                <TripCard
                  key={index}
                  id={_id}
                  cardPicture={pictures ? pictures[0] : ''}
                  description={description}
                  destinations={destinations}
                  title={name}
                />
              );
            },
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};

const Home = observer(BaseHome);

export default Home;
