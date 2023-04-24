import {
  AuthenticatedUser,
  User,
} from "services/dashboard-api/app/schemas/user";

export interface ForAuthenticating {
  login: (email: string, password: string) => Promise<AuthenticatedUser>;
  register: (user: User, password: string) => Promise<AuthenticatedUser>;
}
