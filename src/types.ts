export type AddTripParameters = {
  name?: string;
  description?: string;
  invitedUsers?: string[];
  startDate?: Date;
  endDate?: Date;
  destinations: Destination[];
  tripPic?: string;
  budget?: Budget;
};

export type Budget = {
  accomodation?: string;
  activities?: string;
  food?: string;
  transportation?: string;
  total?: string;
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

export const limitDecimals = (amount: string, limit?: number) => {
  return String(Number(amount).toFixed(limit ?? 2));
};

export type LoginParameters = {
  email: string;
  password: string;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const omitUndefinedProperties = <T extends {}, V = Valuable<T>>(
  object: T,
): V => {
  return Object.fromEntries(
    Object.entries(object).filter(
      ([, v]) =>
        !(
          (typeof v === 'string' && v.length === 0) ||
          v === null ||
          v === undefined
        ),
    ),
  ) as V;
};

export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!#$%&*?@])[\d!#$%&*?@A-Za-z]{8,}$/; // at least 8 characters, 1 digit and 1 special character

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

type Valuable<T> = {
  [K in keyof T as T[K] extends null | undefined ? never : K]: T[K];
};
