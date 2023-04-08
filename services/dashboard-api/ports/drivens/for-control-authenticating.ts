export interface AuthenticationDetails {
  token: string;
  refreshToken: string;
}

export interface Permissions {
  admin: boolean;
  user: boolean;
}

export interface ForControlAuthenticating {
  getAuthenticationDetails: (
    email: string,
    password: string
  ) => Promise<AuthenticationDetails>;
  getPermissions: (email: string, password: string) => Promise<Permissions>;
}
