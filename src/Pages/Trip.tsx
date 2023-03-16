import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ClipLoader } from 'react-spinners';

import { Trip } from '@types';
import { tripStore } from '@Stores/TripStore';

import { uiStore } from '@Stores/UIStore';

const TripPage: FC = () => {
  const { tripId } = useParams();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [trip, setTrip] = useState<Trip>();
  const { isFetching } = useQuery('trips', async () => {
    if (!tripId) {
      throw new Error('No trip ID specified in URL');
    }
    const result = await tripStore.getTripDetails(tripId);
    setTrip(result);
    return result;
  });

  const handleImageLoading = () => {
    setIsImageLoaded(true);
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
      data-testid={`trip-page-${tripId}`}
      className="grid justify-items-center h-full w-[90%] md:w-[60%] lg:w-[40%]"
    >
      <div className="card mb-4 bg-GPmid dark:bg-GPlightGreen shadow-xl cursor-pointer">
        <div className="card-body p-4 lg:p-6 text-GPdark2 dark:text-GPlight">
          <h2
            data-testid={'card-title'}
            className="card-title text-base md:text-xl"
          >
            {trip?.name ?? 'Destinations'}
          </h2>
          <p data-testid={'card-description'} className="text-sm md:text-base">
            {trip?.destinations
              ?.map(
                (destination) =>
                  `${destination.country}${
                    destination.city ? `, ${destination.city}` : ''
                  }`,
              )
              .join(', ')}
          </p>
          {!!trip?.description && (
            <p
              data-testid={'card-description'}
              className="text-sm md:text-base"
            >
              {trip?.description}
            </p>
          )}
          {!!trip?.description && (
            <p
              data-testid={'card-description'}
              className="text-sm md:text-base"
            >
              {trip?.description}
            </p>
          )}
        </div>
        {trip?.pictures && (
          <img
            className={`rounded-b-2xl w-full transition-opacity duration-300 ${
              isImageLoaded ? 'opacity-100 block' : 'opacity-20'
            }`}
            src={trip?.pictures[0]}
            alt={trip.destinations[0].city}
            onLoad={handleImageLoading}
          />
        )}
        {trip?.invitedUsers && trip?.invitedUsers?.length > 0 && (
          <div className="p-6">
            <h2 className="text-lg font-bold">Invited Users</h2>
            <ul>
              <li v-for="user in invitedUsers">user</li>
            </ul>
          </div>
        )}
        {(!!trip?.startDate || !!trip?.endDate) && (
          <div className="p-6">
            <h2 className="text-lg font-bold">Trip Dates</h2>
            <p className="text-gray-700">
              {`${trip?.startDate} to ${trip?.endDate}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripPage;
