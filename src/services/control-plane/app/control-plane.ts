import jwt from "jsonwebtoken";
import { ForRepositoryQuerying } from "../../dashboard-api/ports/drivens/for-repository-querying";
import { ForMonitoringAuthenticationDetails } from "../ports/drivens/for-monitoring";
import { ForManagingAuthentication } from "../ports/drivers/for-authenticating";
import { AuthenticationDetails, Permission } from "./schemas/auth";
import { BaseToken, Token } from "./schemas/token";
import { userWithPermission } from "./schemas/auth";

const userWithPermissionMock: userWithPermission = {
  "123": {
    admin: true,
    user: true,
  },
  "456": {
    admin: false,
    user: true,
  },
  "789": {
    admin: false,
    user: false,
  },
};

export class ControlPlane implements ForManagingAuthentication {
  private readonly secretKey = "mySecretKey";
  private readonly tokenPeriod = "1h";
  private readonly refreshTokenPeriod = "1h";
  private readonly userWithPermission: userWithPermission =
    userWithPermissionMock;

  constructor(
    private readonly logger: ForMonitoringAuthenticationDetails,
    private readonly repository: ForRepositoryQuerying
  ) {}

  async getAuthenticationDetails(
    email: string,
    password: string
  ): Promise<AuthenticationDetails> {
    this.logger.log("Get Authentication Details", "Getting user");
    const user = await this.repository.getUser(email, password);
    if (!user) {
      this.logger.log("Get Authentication Details", "User not found");
      throw new Error("User not found");
    }
    const { id, name } = user;
    const baseToken: BaseToken = {
      payload: {
        id,
        name,
        email,
      },
      secretKey: this.secretKey,
    };

    this.logger.log("Get Authentication Details", "Generating token");
    const tokenValues: Token = {
      ...baseToken,
      period: this.tokenPeriod,
    };
    const token = this.generateJWTToken(tokenValues);

    this.logger.log("Get Authentication Details", "Generating refresh token");
    const refreshTokenValues: Token = {
      ...baseToken,
      period: this.refreshTokenPeriod,
    };
    const refreshToken = this.generateJWTToken(refreshTokenValues);

    this.logger.log("Get Authentication Details", "Returning auth details");
    return {
      token,
      refreshToken,
    };
  }
  async getPermission(email: string, password: string): Promise<Permission> {
    this.logger.log("Get Permission", "Getting user");
    const user = await this.repository.getUser(email, password);

    if (!user) {
      this.logger.log("Get Permission", "User not found");
      throw new Error("User not found");
    }

    this.logger.log("Get Permission", "Returning permissions");
    if (!this.userWithPermission[user.id]) {
      this.logger.log("Get Permission", "User has not permissions defined");
      throw new Error("User has not permissions defined");
    }

    this.logger.log("Get Permission", "Returning permissions");
    return Promise.resolve(this.userWithPermission[user.id]);
  }

  generateJWTToken({ payload, secretKey, period }: Token): string {
    return jwt.sign(payload, secretKey, {
      expiresIn: period,
    });
  }
}
