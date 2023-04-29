import { initTRPC } from "@trpc/server";
import { ControlAuthenticatorStub } from "../adapters/drivens/control-authenticator-stub-adapter";
import { RepoQuerierStub } from "../adapters/drivens/repo-querier-stub-adapter";
import { authTRPCAdapter } from "../adapters/drivers/auth-trpc-adapter";
import { AuthenticatorProxyAdapter } from "../adapters/drivers/authenticator-proxy";
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

// console.log("Running Composition root...");
// const registerMock = {
//   name: "john",
//   email: "john@mal.com",
//   password: "1234",
// };
// authenticatorProxyAdapter.login("john@gmail.com", "1234");
// authenticatorProxyAdapter.register(registerMock);

export const localTRPCCompose = () => {
  const controlAuthenticatorStub = new ControlAuthenticatorStub();
  const repoQuerierStub = new RepoQuerierStub();
  const dashboardApiMock = new DashboardApi(
    controlAuthenticatorStub,
    repoQuerierStub
  );

  const t = initTRPC.create();

  const authTRPCAdapterRouter = authTRPCAdapter(dashboardApiMock, t);
  const appRouter = t.router({
    auth: authTRPCAdapterRouter,
  });
  return { appRouter };
};
