import { User } from "../../dashboard-api/app/schemas/user";
import { ForAuthenticating } from "../../dashboard-api/ports/drivers/for-authenticating";
import { ForMonitoringAuthenticationDetails } from "../ports/drivens/for-monitoring";

const authenticatedUserMock = {
  id: "123",
  name: "John Doe",
  email: "johndoe@mail.com",
  authDetails: {
    token: "token",
    refreshToken: "refreshToken",
  },
  permissions: {
    admin: true,
    user: true,
  },
};

export class ControlPlane implements ForAuthenticating {
  constructor(private readonly logger: ForMonitoringAuthenticationDetails) {}
  async login(
    _email: string,
    _password: string
  ): Promise<{
    id: string;
    name: string;
    email: string;
    authDetails: { token: string; refreshToken: string };
    permissions: { admin: boolean; user: boolean };
  }> {
    this.logger.log("login", "User logged in");
    return Promise.resolve(authenticatedUserMock);
  }

  async register(_user: User): Promise<{
    id: string;
    name: string;
    email: string;
    authDetails: { token: string; refreshToken: string };
    permissions: { admin: boolean; user: boolean };
  }> {
    this.logger.log("register", "User registered");
    return Promise.resolve(authenticatedUserMock);
  }
}
