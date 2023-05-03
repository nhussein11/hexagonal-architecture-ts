import { AuthenticationDetails, Permission } from "../../app/schemas/auth";

export interface ForManagingAuthentication {
  getAuthenticationDetails(
    email: string,
    password: string
  ): Promise<AuthenticationDetails>;
  getPermission(email: string, password: string): Promise<Permission>;
}
