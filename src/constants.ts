export type TripCardData = {
  title?: string;
  description?: string;
  destination: string;
  startDate?: string;
  endDate?: string;
  labels?: TripLabel[];
  cardPicture?: string;
};

export enum TripLabel {
  lastMinute = 'Last Minute',
}
