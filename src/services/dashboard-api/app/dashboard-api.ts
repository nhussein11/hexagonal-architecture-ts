import { ForAuthenticating } from "../ports/drivers/for-authenticating";
import { ForRepositoryQuerying } from "../ports/drivens/for-repository-querying";
import { ForControlAuthenticating } from "../ports/drivens/for-control-authenticating";
import { AuthenticationDetails, Permissions } from "./schemas/auth";
import { AuthenticatedUser, User } from "./schemas/user";
import { ExternalUser } from "../../repository/app/schemas/user";

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

    const user: ExternalUser = await this.repoQuerier.getUser(email);

    return {
      ...user,
      authDetails: { ...authenticationDetails },
      permissions: { ...permissions },
    };
  }

  async register(user: User): Promise<AuthenticatedUser> {
    const newUser: ExternalUser = await this.repoQuerier.createUser(user);
    const { email } = newUser;

    const authDetails: AuthenticationDetails =
      await this.controlAuthenticator.getAuthenticationDetails(
        email,
        user.password
      );

    const permissions: Permissions =
      await this.controlAuthenticator.getPermissions(email, user.password);

    return {
      ...newUser,
      authDetails: { ...authDetails },
      permissions: { ...permissions },
    };
  }
}
