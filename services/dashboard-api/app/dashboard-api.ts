import {
  AuthenticatedUser,
  ForAuthenticating,
  User,
} from "../ports/drivers/for-authenticating";
import { ForRepositoryQuerying } from "../ports/drivens/for-repository-querying";
import { user as RepoUser } from "@repository-app/schemas/user";
import {
  AuthenticationDetails,
  ForControlAuthenticating,
  Permissions,
} from "@dashboard-app-port/drivers/for-authenticating";

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

    const user: RepoUser = await this.repoQuerier.getUser(email);

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
