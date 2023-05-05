import { describe, it, expect } from "vitest";
import { LoggerControlPlaneAdapter } from "../adapters/drivens/logger-adapter";
import { RepoQuerierStub } from "../adapters/drivens/repo-querier-stub-adapter";
import { ControlPlane } from "./control-plane";
import jwt from "jsonwebtoken";

const signJWTHelper = (payload: any, secretKey: string, expiresIn: string) => {
  return jwt.sign(payload, secretKey, { expiresIn });
};

describe("control-plane", () => {
  const logger = new LoggerControlPlaneAdapter();
  const repository = new RepoQuerierStub();
  const controlPlane = new ControlPlane(logger, repository);

  it.concurrent("should be able to get authentication details", async () => {
    const mockedParams = {
      email: "johndoe@mail.com",
      password: "123456",
    };
    const { email, password } = mockedParams;

    const expectedPayload = {
      id: "123",
      name: "John Doe",
      email: "johndoe@mail.com",
    };
    const expectedToken = signJWTHelper(expectedPayload, "mySecretKey", "1h");
    const expectedRefreshToken = signJWTHelper(
      expectedPayload,
      "mySecretKey",
      "4h"
    );

    const expectedResult = {
      token: expectedToken,
      refreshToken: expectedRefreshToken,
    };

    const result = await controlPlane.getAuthenticationDetails(email, password);
    expect(result).toEqual(expectedResult);
  });

  it.concurrent(
    "should not be able to get authentication details for user not found",
    async () => {
      const mockedParams = {
        // not registered email
        email: "janedoe@mail.com",
        password: "123456",
      };

      const { email, password } = mockedParams;

      try {
        await controlPlane.getAuthenticationDetails(email, password);
      } catch (error) {
        expect(error).toEqual(new Error("User not found"));
      }
    }
  );
  it.concurrent(
    "should be able to get permission details for user",
    async () => {
      const mockedParams = {
        email: "johndoe@mail.com",
        password: "123456",
      };
      const { email, password } = mockedParams;

      const expectedResult = {
        admin: true,
        user: true,
      };

      const result = await controlPlane.getPermission(email, password);
      expect(result).toEqual(expectedResult);
    }
  );
});
