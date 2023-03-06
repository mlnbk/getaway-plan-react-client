export type AddTripParameters = {
  name?: string;
  description?: string;
  invitedUsers?: string[];
  startDate?: Date;
  endDate?: Date;
  destinations: Destination[];
  budget?: Budget;
};

export type Budget = {
  total?: number;
  accomodation?: number;
  transportation?: number;
  food?: number;
  activites?: number;
};

export type Destination = {
  country: string;
  city?: string;
  address?: string;
};

export type GetTripsForUserParamters = {
  filters?: {
    invitedUsers?: string[];
    status?: TripStatus[];
    destinations?: Destination[];
  };
  skip?: number;
  limit?: number;
};

export type GetTripsForUserResponse = {
  trips: Trip[];
  total: number;
  hasMore: boolean;
};

export type LoginParameters = {
  email: string;
  password: string;
};

export enum Role {
  admin = 'admin',
  user = 'user',
}

export enum SpinnerColor {
  dark = '#9DAD7F', // GPmid2
  light = '#C7CFB7', // GPmid
}

export type Trip = {
  name?: string;
  description?: string;
  invitedUsers?: string[];
  startDate?: Date;
  endDate?: Date;
  destinations: Destination[];
  budget?: Budget;
  picture?: string;
};

export type TripCardData = {
  title?: string;
  description?: string;
  destinations?: Destination[];
  startDate?: string;
  endDate?: string;
  labels?: TripLabel[];
  cardPicture?: string;
};

export enum TripLabel {
  lastMinute = 'Last Minute',
}

export enum TripStatus {
  past = 'past',
  current = 'current',
  upcoming = 'upcoming',
}

export class User {
  email!: string;
  name!: string;
  profilePic!: Buffer;
  roles!: Role[];
}
