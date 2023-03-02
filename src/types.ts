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

export class User {
  email!: string;
  name!: string;
  profilePic!: Buffer;
  roles!: Role[];
}
