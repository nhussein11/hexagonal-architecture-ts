import {
  AuthenticationDetails,
  Permissions,
} from "services/dashboard-api/app/schemas/auth";

export interface ForControlAuthenticating {
  getAuthenticationDetails: (
    email: string,
    password: string
  ) => Promise<AuthenticationDetails>;
  getPermissions: (email: string, password: string) => Promise<Permissions>;
}
