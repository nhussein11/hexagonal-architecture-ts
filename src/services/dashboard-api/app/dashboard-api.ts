import { ForAuthenticating } from "../ports/drivers/for-authenticating";
import { ForRepositoryQuerying } from "../ports/drivens/for-repository-querying";
import { ForControlAuthenticating } from "../ports/drivens/for-control-authenticating";
import { AuthenticationDetails, Permissions } from "./schemas/auth";
import { AuthenticatedUser, User } from "./schemas/user";
import { RepoUser } from "../../repository/app/schemas/user";

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

    return { ...user, ...authenticationDetails, permissions };
  }

  async register(user: User): Promise<AuthenticatedUser> {
    const newUser = await this.repoQuerier.createUser(user);
    const { email } = newUser;

    const authenticationDetails: AuthenticationDetails =
      await this.controlAuthenticator.getAuthenticationDetails(
        email,
        user.password
      );

    const permissions: Permissions =
      await this.controlAuthenticator.getPermissions(email, user.password);

    return { ...newUser, ...authenticationDetails, permissions };
  }
}
