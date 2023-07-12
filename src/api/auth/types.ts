export interface AuthenticateResponse {
  Token: Token;
  Point: Point;
}

export interface Token {
  AccessToken: string;
  TokenType: string;
  CreatedAtUtc: string;
  ExpiresAtUtc: string;
  Username: string;
  CustomerId: number;
  CustomerGuid: string;
  FullName: string;
}

export interface Point {
  RewardPointsBalance: number;
  RewardPointsAmount: string;
  MinimumRewardPointsBalance: number;
  MinimumRewardPointsAmount: string;
}
export interface AuthenticateReq {
  email: string;
  password: string;
  deviceToken?: string;
}
