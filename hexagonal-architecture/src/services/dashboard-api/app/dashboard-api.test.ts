import { describe, it, expect } from "vitest";
import { ControlAuthenticatorStub } from "../adapters/drivens/control-authenticator-stub-adapter";
import { RepoQuerierStub } from "../adapters/drivens/repo-querier-stub-adapter";
import { DashboardApi } from "./dashboard-api";
import { AuthenticatedUser } from "./schemas/user";

describe("dashboard-api", () => {
  const controlAuthenticatorStub = new ControlAuthenticatorStub();
  const repoQuerierStub = new RepoQuerierStub();
  const dashboardApiMock = new DashboardApi(
    controlAuthenticatorStub,
    repoQuerierStub
  );

  it.concurrent("should login", async () => {
    const mockedParams = { email: "lucas@email.com", password: "password" };
    const expectedResult: AuthenticatedUser = {
      id: "1",
      name: "Lucas",
      email: mockedParams.email,
      token: "token",
      refreshToken: "refreshToken",
      permissions: {
        admin: true,
        user: true,
      },
    };

    const result = await dashboardApiMock.login(
      mockedParams.email,
      mockedParams.password
    );

    expect(result).toEqual(expectedResult);
  });

  it.concurrent("should register", async () => {
    const mockedParams = {
      user: { name: "Lucas", email: "lucas@email.com" },
      password: "password",
    };

    const expectedResult: AuthenticatedUser = {
      id: "1",
      name: "Lucas",
      email: mockedParams.user.email,
      token: "token",
      refreshToken: "refreshToken",
      permissions: {
        admin: true,
        user: true,
      },
    };

    const result = await dashboardApiMock.register(
      mockedParams.user,
      mockedParams.password
    );

    expect(result).toEqual(expectedResult);
  });
});
