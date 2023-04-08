import {
  ForControlAuthenticating,
  AuthenticationDetails,
  Permissions,
} from "@dashboard-api-ports/drivens/for-control-authenticating";

const authenticationDetailsMock: AuthenticationDetails = {
  token: "token",
  refreshToken: "refreshToken",
};

const permissionsMock: Permissions = {
  admin: true,
  user: true,
};

export class ControlAuthenticatorStub implements ForControlAuthenticating {
  private readonly authenticationDetails: AuthenticationDetails;
  private readonly permissions: Permissions;

  constructor(
    authenticationDetails: AuthenticationDetails,
    permissions: Permissions
  ) {
    this.authenticationDetails = authenticationDetails;
    this.permissions = permissions;
  }

  getAuthenticationDetails = async (
    _email: string,
    _password: string
  ): Promise<AuthenticationDetails> => {
    return Promise.resolve(this.authenticationDetails);
  };

  getPermissions = async (
    _email: string,
    _password: string
  ): Promise<Permissions> => {
    return Promise.resolve(this.permissions);
  };
}
