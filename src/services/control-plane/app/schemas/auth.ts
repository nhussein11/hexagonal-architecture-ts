export interface AuthenticationDetails {
  token: string;
  refreshToken: string;
}

export interface Permission {
  admin: boolean;
  user: boolean;
}
