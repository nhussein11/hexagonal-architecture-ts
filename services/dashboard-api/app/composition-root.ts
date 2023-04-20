// import { ControlAuthenticatorStub } from "@dashboard-api-adapters/drivens/control-authenticator-stub-adapter";
import { ControlAuthenticatorStub } from "../adapters/drivens/control-authenticator-stub-adapter";
import { RepoQuerierStub } from "@dashboard-api-adapters/drivens/repo-querier-stub-adapter";
import { AuthenticatorProxyAdapter } from "@dashboard-api-adapters/drivers/authenticator-proxy";
import { DashboardApi } from "./dashboard-api";

const compositionMock = () => {
  const controlAuthenticatorStub = new ControlAuthenticatorStub();
  const repoQuerierStub = new RepoQuerierStub();
  const dashboardApiMock = new DashboardApi(
    controlAuthenticatorStub,
    repoQuerierStub
  );

  const authenticatorProxyAdapter = new AuthenticatorProxyAdapter(
    dashboardApiMock
  );

  return {
    authenticatorProxyAdapter,
  };
};

export const { authenticatorProxyAdapter } = compositionMock();

const registerMock = { name: "john", email: "john@mal.com" };
authenticatorProxyAdapter.login("john@gmail.com", "1234");
authenticatorProxyAdapter.register(registerMock, "1234");
