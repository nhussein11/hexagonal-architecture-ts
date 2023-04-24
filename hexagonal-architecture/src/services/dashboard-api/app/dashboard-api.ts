import { ForAuthenticating } from "../ports/drivers/for-authenticating";
import { ForRepositoryQuerying } from "../ports/drivens/for-repository-querying";
import { User as RepoUser } from "../../repository/app/schemas/user";
import { ForControlAuthenticating } from "../ports/drivens/for-control-authenticating";
import { AuthenticationDetails, Permissions } from "./schemas/auth";
import { AuthenticatedUser, User } from "./schemas/user";

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

    const result = { ...user, ...authenticationDetails, permissions };
    console.log("Login: ", result);
    return result;
  }

  async register(user: User, password: string): Promise<AuthenticatedUser> {
    const newUser = await this.repoQuerier.createUser(user, password);
    const { email } = newUser;

    const authenticationDetails: AuthenticationDetails =
      await this.controlAuthenticator.getAuthenticationDetails(email, password);

    const permissions: Permissions =
      await this.controlAuthenticator.getPermissions(email, password);

    const result = { ...newUser, ...authenticationDetails, permissions };
    console.log("REGISTER: ", result);
    return result;
  }
}
