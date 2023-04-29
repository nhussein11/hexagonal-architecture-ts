import { AuthenticationDetails, Permissions } from "../../app/schemas/auth";
import { ForControlAuthenticating } from "../../ports/drivens/for-control-authenticating";

const authenticationDetailsMock: AuthenticationDetails = {
  token: "token",
  refreshToken: "refreshToken",
};

const permissionsMock: Permissions = {
  admin: true,
  user: true,
};

export class ControlAuthenticatorStub implements ForControlAuthenticating {
  getAuthenticationDetails = async (
    _email: string,
    _password: string
  ): Promise<AuthenticationDetails> => {
    return Promise.resolve(authenticationDetailsMock);
  };

  getPermissions = async (
    _email: string,
    _password: string
  ): Promise<Permissions> => {
    return Promise.resolve(permissionsMock);
  };
}
