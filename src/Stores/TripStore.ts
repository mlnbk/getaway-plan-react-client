import { types } from 'mobx-state-tree';

import {
  AddTripParameters,
  GetTripsForUserParamters,
  GetTripsForUserResponse,
} from '@types';
import { apiService } from '@Utils/APIService';

const TripStore = types.model().actions((self) => ({
  async getTripsForUser({
    filters,
    skip,
    limit,
  }: GetTripsForUserParamters): Promise<GetTripsForUserResponse> {
    const tripResponse = await apiService.get('/trips/my-trips', {
      params: {
        filters,
        skip: skip ?? 0, // already loaded trips.length ?? 0
        limit: limit ?? 12, // screen based
      },
    });
    if (!tripResponse) {
      throw new Error('Error gettin trips for user. Please try again later!');
    }
    return tripResponse;
  },
  async addTrip(tripData: AddTripParameters) {
    return apiService.post('/trips/add', tripData);
  },
}));

export const tripStore = TripStore.create();
