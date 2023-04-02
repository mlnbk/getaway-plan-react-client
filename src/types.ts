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

export type City = {
  name: string;
  countryCode: string;
};

export type Country = {
  name: string;
  code: string;
  imageUrl?: string;
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

export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!#$%&*?@])[\d!#$%&*?@A-Za-z]{8,}$/;

export enum Role {
  admin = 'admin',
  user = 'user',
}

export type SignupFormValues = SignupParameters & {
  confirm: string;
};

export interface SignupParameters {
  name: string;
  email: string;
  password: string;
}

export enum SpinnerColor {
  dark = '#9DAD7F', // GPmid2
  light = '#C7CFB7', // GPmid
}

export type Trip = {
  _id: string;
  name?: string;
  description?: string;
  invitedUsers?: string[];
  startDate?: Date;
  endDate?: Date;
  destinations: Destination[];
  budget?: Budget;
  pictures?: string[];
};

export type TripCardData = {
  id: string;
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
