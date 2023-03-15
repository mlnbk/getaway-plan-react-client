import { types } from 'mobx-state-tree';

import {
  GetTripsForUserParamters,
  GetTripsForUserResponse,
  Trip,
} from '@types';
import { apiService } from '@Utils/APIService';

const TripStore = types.model().actions((self) => ({
  async addTrip(tripData: FormData) {
    const result = apiService.post('/trips/add', tripData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return result;
  },
  async deleteTrip(tripId: string) {
    return apiService.delete(`/trips/${tripId}`);
  },
  async getTripDetails(tripId: string): Promise<Trip> {
    return apiService.get(`/trips/${tripId}`);
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
}));

export const tripStore = TripStore.create();
