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
  countryCode: any;
  city: string;
  country: string;
  blocked: boolean;
  userType: string;
  activeUserType: string;
  referralCode: any;
  noOfIncompletePortals: number;
  noOfUnreadNotifications: number;
  wallet: Wallet;
  referralWallet: ReferralWallet;
  publisherDetails?: IPublisherDetails;
  advertiserDetails?: IAdvertiserDetails;
  publisherDashboard?: PublisherDashboard;
  advertiserDashboard?: AdvertiserDashboard;
  settings: Settings;
}

export interface IAdvertiserDetails {
  isAgency: boolean;
  agencyName: string;
}

export interface IPublisherDetails {
  companyName: any;
}

export interface Wallet {
  balance: number;
  earnings: number;
}

export interface ReferralWallet {
  balance: number;
  earnings: number;
}

export interface PublisherDashboard {
  totalPortals: number;
  noOfPendingPortals: number;
  totalTasks: number;
  noOfAcceptedTasks: number;
  noOfCompletedTasks: number;
  noOfPendingTasks: number;
}

export interface AdvertiserDashboard {
  totalOffers: number;
  noOfAcceptedOffers: number;
  noOfCompletedOffers: number;
  noOfBannerRequests: number;
  noOfGuestPostRequests: number;
  noOfContentRequests: number;
}

export interface Settings {
  bannerRequestPrice: any;
  guestPostRequestPrice: any;
  minimumDomainAuthority: any;
  minimumTraffic: any;
  referralPercentage: any;
  referralWithdrawalLimit: any;
  walletWithdrawalLimit: any;
  usdToNairaExchangeRate: any;
}

//Notifications Type

export interface INotificationsType {
  status: number;
  message: string;
  data: INotificationData[];
  meta: Meta;
}

export interface INotificationData {
  id: number;
  title: string;
  message: string;
  unread: boolean;
  dateModified: string;
  dateCreated: string;
}

export interface Meta {
  total: number;
}

// Activities Data
export interface IUserActivitiesType {
  status: number;
  message: string;
  data: IUserActivitiesData[];
  meta: Meta;
}

export interface IUserActivitiesData {
  id: string;
  title: string;
  description?: string;
  date: string;
}

export interface Meta {
  total: number;
}

// Referral Types
export interface IReferralType {
  status: number;
  message: string;
  data: IReferralTypeData[];
  meta: Meta;
}

export interface IReferralTypeData {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  amount: any;
  dpUrl: string;
  dateModified: string;
  dateCreated: string;
}

export interface Meta {
  total: number;
}
