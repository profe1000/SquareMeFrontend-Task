export interface IAuthType {
  message?: string;
  data?: IData;
}

export interface IData {
  status: number;
  token: string;
  credentials: ICredentials;
}

export interface ICredentials {
  userId: number;
  email: string;
  emailVerified: boolean;
  username: any;
  firstName: string;
  lastName: string;
  fullName: string;
  dpUrl: string;
  phoneNumber: string;
}
