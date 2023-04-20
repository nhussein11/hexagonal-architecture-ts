import {
  AuthenticationDetails,
  ForControlAuthenticating,
  Permissions,
} from "@dashboard-api-ports/drivens/for-control-authenticating";
import {
  AuthenticatedUser,
  ForAuthenticating,
  User,
} from "@dashboard-api-ports/drivers/for-authenticating";
import { ForRepositoryQuerying } from "@dashboard-api-ports/drivens/for-repository-querying";

export class DashboardApi implements ForAuthenticating {
  constructor(
    private readonly controlAuthenticator: ForControlAuthenticating,
    private readonly repoQuerier: ForRepositoryQuerying
  ) {}

  async login(email: string, password: string): Promise<AuthenticatedUser> {
    const authenticationDetails: AuthenticationDetails =
      await this.controlAuthenticator.getAuthenticationDetails(email, password);

    const permissions: Permissions =
      await this.controlAuthenticator.getPermissions(email, password);

    const user: User = await this.repoQuerier.getUser(email);

    console.log("Login: ", user);
    return {
      ...user,
      ...authenticationDetails,
      ...permissions,
    };
  }

  async register(user: User, password: string): Promise<AuthenticatedUser> {
    const newUser = await this.repoQuerier.createUser(user, password);
    const { email } = newUser;

    const authenticationDetails: AuthenticationDetails =
      await this.controlAuthenticator.getAuthenticationDetails(email, password);

    const permissions: Permissions =
      await this.controlAuthenticator.getPermissions(email, password);

    console.log("REGISTER: ", newUser);
    return {
      ...newUser,
      ...authenticationDetails,
      ...permissions,
    };
  }
}
