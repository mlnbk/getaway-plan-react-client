import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ClipLoader } from 'react-spinners';

import { currencyPrefix } from '../constants';
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
      className="grid justify-items-center w-[90%] md:w-[60%] lg:w-[40%]"
    >
      <div className="card w-full bg-GPmid dark:bg-GPlightGreen shadow-xl">
        <div className="card-body p-6 text-GPdark2 dark:text-GPlight">
          <div className="text-sm md:text-base pb-3">
            <p className="font-bold text-base md:text-xl pb-3">
              {trip?.name ?? 'Destination'}
            </p>
            {trip?.destinations
              ?.map(
                (destination) =>
                  `${destination.country}${
                    destination.city ? `, ${destination.city}` : ''
                  }`,
              )
              .join(', ')}
          </div>
          {!!trip?.description && (
            <p className="text-sm md:text-base">{trip?.description}</p>
          )}
          {!!trip?.budget?.total && (
            <div className="text-sm md:text-base">
              <p className="font-bold text-base md:text-xl pb-3">Budget</p>
              <div className="grid grid-cols-[auto_1fr] gap-y-3 gap-x-12 items-center">
                <p>Accomodation</p>
                <p>
                  {currencyPrefix} {trip.budget.accomodation}
                </p>
                <p>Activities</p>
                <p>
                  {currencyPrefix} {trip.budget.activities}
                </p>
                <p>Food</p>
                <p>
                  {currencyPrefix} {trip.budget.food}
                </p>
                <p>Transportation</p>
                <p>
                  {currencyPrefix} {trip.budget.transportation}
                </p>
                <p className="font-bold">Total</p>
                <p className="font-bold">
                  {currencyPrefix} {trip.budget.total}
                </p>
              </div>
            </div>
          )}
        </div>
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
        {trip?.pictures && trip.pictures.length > 0 && (
          <img
            className={`rounded-b-2xl w-full transition-opacity duration-300 ${
              isImageLoaded ? 'opacity-100 block' : 'opacity-20'
            }`}
            src={trip?.pictures[0]}
            alt={trip.destinations[0].city}
            onLoad={handleImageLoading}
          />
        )}
      </div>
    </div>
  );
};

export default TripPage;
