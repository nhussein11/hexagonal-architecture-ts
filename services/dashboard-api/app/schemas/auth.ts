export interface AuthenticationDetails {
  token: string;
  refreshToken: string;
}

export interface Permissions {
  admin: boolean;
  user: boolean;
}
