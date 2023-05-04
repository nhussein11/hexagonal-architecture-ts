import { User } from "../../dashboard-api/app/schemas/user";
import { ForRepositoryQuerying } from "../../dashboard-api/ports/drivens/for-repository-querying";
import { ForAuthenticating } from "../../dashboard-api/ports/drivers/for-authenticating";
import { ForMonitoringAuthenticationDetails } from "../ports/drivens/for-monitoring";
import { ForManagingAuthentication } from "../ports/drivers/for-authenticating";
import { AuthenticationDetails, Permission } from "./schemas/auth";
import jwt from "jsonwebtoken";

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

export class ControlPlane implements ForManagingAuthentication {
  constructor(
    private readonly logger: ForMonitoringAuthenticationDetails,
    private readonly repository: ForRepositoryQuerying
  ) {}

  async getAuthenticationDetails(
    email: string,
    password: string
  ): Promise<AuthenticationDetails> {
    this.logger.log("Get Authentication Details", "Getting user");
    const user = await this.repository.getUser(email);
    if (!user) {
      this.logger.log("Get Authentication Details", "User not found");
      throw new Error("User not found");
    }

    this.logger.log("Get Authentication Details", "Checking password");
    if (user.password !== password) {
      this.logger.log("Get Authentication Details", "Password is incorrect");
      throw new Error("Password is incorrect");
    }

    this.logger.log("Get Authentication Details", "Generating token");
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      "secret",
      {
        expiresIn: "1h",
      }
    );

    this.logger.log("Get Authentication Details", "Generating refresh token");
    const refreshToken = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      "secret",
      {
        expiresIn: "1d",
      }
    );

    this.logger.log("Get Authentication Details", "Returning auth details");
    return {
      token,
      refreshToken,
    };
  }
  getPermission(email: string, password: string): Promise<Permission> {
    throw new Error("Method not implemented.");
  }
}
