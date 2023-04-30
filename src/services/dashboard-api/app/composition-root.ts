import { initTRPC } from "@trpc/server";
import { ControlAuthenticatorStub } from "../adapters/drivens/control-authenticator-stub-adapter";
import { RepoQuerierStub } from "../adapters/drivens/repo-querier-stub-adapter";
import { authTRPCAdapter } from "../adapters/drivers/auth-trpc-adapter";
import { AuthenticatorProxyAdapter } from "../adapters/drivers/authenticator-proxy";
import { DashboardApi } from "./dashboard-api";

// TODO: in the future, this could apply the strategy pattern
// interface AuthStrategy {
//   authenticate(): void;
// }

const compositionMock = () => {
  const controlAuthenticatorStub = new ControlAuthenticatorStub();
  const repoQuerierStub = new RepoQuerierStub();
  const dashboardApiMock = new DashboardApi(
    controlAuthenticatorStub,
    repoQuerierStub
  );

  // TODO: in the future, this could apply the strategy pattern
  const authenticatorProxyAdapter = new AuthenticatorProxyAdapter(
    dashboardApiMock
  );

  return {
    authenticatorProxyAdapter,
  };
};

export const { authenticatorProxyAdapter } = compositionMock();

export const localTRPCCompose = () => {
  const controlAuthenticatorStub = new ControlAuthenticatorStub();
  const repoQuerierStub = new RepoQuerierStub();
  const dashboardApiMock = new DashboardApi(
    controlAuthenticatorStub,
    repoQuerierStub
  );

  // TODO: in the future, this could apply the strategy pattern
  const t = initTRPC.create();

  const authTRPCAdapterRouter = authTRPCAdapter(dashboardApiMock, t);

  const appRouter = t.mergeRouters(authTRPCAdapterRouter);

  return { appRouter };
};

export const { appRouter } = localTRPCCompose();
