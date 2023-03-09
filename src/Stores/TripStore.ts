import { types } from 'mobx-state-tree';

import {
  AddTripParameters,
  GetTripsForUserParamters,
  GetTripsForUserResponse,
} from '@types';
import { apiService } from '@Utils/APIService';

const TripStore = types.model().actions((self) => ({
  async deleteTrip(tripId: string) {
    return apiService.delete(`/trips/${tripId}`);
  },
  async getTripsForUser({
    filters,
    skip,
    limit,
  }: GetTripsForUserParamters): Promise<GetTripsForUserResponse> {
    return apiService.get('/trips/my-trips', {
      params: {
        filters,
        skip: skip ?? 0,
        limit: limit ?? 15, // screen based
      },
    });
  },
  async addTrip(tripData: any) {
    console.log('tripData', tripData);
    return apiService.post('/trips/add', tripData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
}));

export const tripStore = TripStore.create();
