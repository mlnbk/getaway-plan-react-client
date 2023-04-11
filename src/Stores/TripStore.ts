import { types } from 'mobx-state-tree';

import {
  Budget,
  GetTripsForUserParamters,
  GetTripsForUserResponse,
  limitDecimals,
  Trip,
} from '@types';
import { apiService } from '@Utils/APIService';

const TripStore = types.model().actions(() => ({
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
        limit: limit ?? 15,
      },
    });
  },
  calculateTripBudget({
    accomodation,
    activities,
    food,
    transportation,
    total,
  }: Budget) {
    return {
      accomodation: accomodation ? limitDecimals(accomodation) : '0.00',
      activities: activities ? limitDecimals(activities) : '0.00',
      food: food ? limitDecimals(food) : '0.00',
      transportation: transportation ? limitDecimals(transportation) : '0.00',
      total,
    };
  },
}));

export const tripStore = TripStore.create();
