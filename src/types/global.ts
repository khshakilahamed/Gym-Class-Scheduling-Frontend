/* eslint-disable @typescript-eslint/no-explicit-any */
export type INavItems = {
  key: string;
  label: string | React.ReactNode | React.ReactElement;
}[];

export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorDetails: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  field: string | number;
  message: string;
};

export type ApiError = {
  data?: {
    message?: string;
  };
};

// Define the user type with your custom fields
export type UserInfo = {
  userId?: string;
  email?: string;
  role?: string;
} | null;

// Define the state type
export interface AuthState {
  accessToken?: string;
  user?: UserInfo;
}

export type IUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: string;
};

export type ITimeSlot = {
  _id: string;
  startingTime: string;
  endingTime: string;
  createdBy: IUser | string;
  updatedBy: IUser | string;
};

export type IClassSchedule = {
  _id: string;
  title: string;
  day: string;
  maxTrainees: number;
  trainers: IUser[] | string[];
  timeSlotId: ITimeSlot | string;
  duration: number;
  createdBy: IUser;
  updatedBy: IUser;
};

export interface IBooking {
  _id: string;
  classScheduleId: IClassSchedule | string;
  userId: IUser | string;
  date: string;
  isCancel: boolean;
  createdAt: IUser | string;
  updatedAt: IUser | string;
}

