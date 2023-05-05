import { describe, it, expect } from "vitest";
import { LoggerControlPlaneAdapter } from "../adapters/drivens/logger-adapter";
import { RepoQuerierStub } from "../adapters/drivens/repo-querier-stub-adapter";
import { ControlPlane } from "./control-plane";
import jwt from "jsonwebtoken";

describe("control-plane", () => {
  const logger = new LoggerControlPlaneAdapter();
  const repository = new RepoQuerierStub();
  const controlPlane = new ControlPlane(logger, repository);

  it("should be able to get authentication details", async () => {
    const mockedParams = {
      email: "johndoe@mail.com",
      password: "123456",
    };
    const { email, password } = mockedParams;

    const expectedToken = jwt.sign(
      {
        id: "123",
        name: "John Doe",
        email: "johndoe@mail.com",
      },
      "mySecretKey",
      { expiresIn: "1h" }
    );

    const expectedRefreshToken = jwt.sign(
      {
        id: "123",
        name: "John Doe",
        email: "johndoe@mail.com",
      },
      "mySecretKey",
      { expiresIn: "4h" }
    );

    const expectedResult = {
      token: expectedToken,
      refreshToken: expectedRefreshToken,
    };

    const result = await controlPlane.getAuthenticationDetails(email, password);
    expect(result).toEqual(expectedResult);
  });
});
