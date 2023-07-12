export interface User {
  Email: string;
  EmailToRevalidate: any;
  CheckUsernameAvailabilityEnabled: boolean;
  AllowUsersToChangeUsernames: boolean;
  UsernamesEnabled: boolean;
  Username: string;
  GenderEnabled: boolean;
  Gender: string;
  FirstNameEnabled: boolean;
  FirstName: string;
  FirstNameRequired: boolean;
  LastNameEnabled: boolean;
  LastName: string;
  LastNameRequired: boolean;
  DateOfBirthEnabled: boolean;
  DateOfBirthDay: number;
  DateOfBirthMonth: number;
  DateOfBirthYear: number;
  DateOfBirthRequired: boolean;
  CompanyEnabled: boolean;
  CompanyRequired: boolean;
  Company: string;
  StreetAddressEnabled: boolean;
  StreetAddressRequired: boolean;
  StreetAddress: any;
  StreetAddress2Enabled: boolean;
  StreetAddress2Required: boolean;
  StreetAddress2: any;
  ZipPostalCodeEnabled: boolean;
  ZipPostalCodeRequired: boolean;
  ZipPostalCode: any;
  CityEnabled: boolean;
  CityRequired: boolean;
  City: any;
  CountyEnabled: boolean;
  CountyRequired: boolean;
  County: any;
  CountryEnabled: boolean;
  CountryRequired: boolean;
  CountryId: number;
  AvailableCountries: any[];
  StateProvinceEnabled: boolean;
  StateProvinceRequired: boolean;
  StateProvinceId: number;
  AvailableStates: any[];
  PhoneEnabled: boolean;
  PhoneRequired: boolean;
  Phone: any;
  FaxEnabled: boolean;
  FaxRequired: boolean;
  Fax: any;
  NewsletterEnabled: boolean;
  Newsletter: boolean;
  SignatureEnabled: boolean;
  Signature: any;
  TimeZoneId: any;
  AllowCustomersToSetTimeZone: boolean;
  AvailableTimeZones?: AvailableTimeZone[];
  VatNumber: any;
  VatNumberStatusNote: string;
  DisplayVatNumber: boolean;
  AssociatedExternalAuthRecords: any[];
  NumberOfExternalAuthenticationProviders: number;
  AllowCustomersToRemoveAssociations: boolean;
  CustomerAttributes: any[];
  GdprConsents: any[];
  CustomProperties: CustomProperties;
}

export interface AvailableTimeZone {
  Disabled: boolean;
  Group: any;
  Selected: boolean;
  Text: string;
  Value: string;
}

export interface CustomProperties {}

export interface PointResponse {
  RewardPoints: RewardPoint[];
  PagerModel: PagerModel;
  RewardPointsBalance: number;
  RewardPointsAmount: string;
  MinimumRewardPointsBalance: number;
  MinimumRewardPointsAmount: string;
  CustomProperties: CustomProperties2;
}

export interface RewardPoint {
  Points: number;
  PointsBalance: string;
  Message: string;
  CreatedOn: string;
  EndDate: any;
  Id: number;
  CustomProperties: CustomProperties;
}

export interface CustomProperties {}

export interface PagerModel {
  CurrentPage: number;
  IndividualPagesDisplayedCount: number;
  PageIndex: number;
  PageSize: number;
  ShowFirst: boolean;
  ShowIndividualPages: boolean;
  ShowLast: boolean;
  ShowNext: boolean;
  ShowPagerItems: boolean;
  ShowPrevious: boolean;
  ShowTotalSummary: boolean;
  TotalPages: number;
  TotalRecords: number;
  RouteActionName: string;
  UseRouteLinks: boolean;
  RouteValues: RouteValues;
}

export interface RouteValues {
  PageNumber: number;
}

export interface CustomProperties2 {}
export interface UserAvatar {
  AvatarUrl: string;
  CustomProperties: any;
}
