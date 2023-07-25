export interface User {
  _id: string;
  email: string;
  gender: string;
  id: string;
  name: string;
  avatarUrl: string;
  phone: string;
  address: string;
  created: string;
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
