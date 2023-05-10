import { initTRPC } from "@trpc/server";
import { ControlAuthenticatorStub } from "../adapters/drivens/control-authenticator-stub-adapter";
import { RepoQuerierStub } from "../adapters/drivens/repo-querier-stub-adapter";
import {
    AuthTRPCAdapter,
} from "../adapters/drivers/auth-trpc-adapter";
import { AuthenticatorProxyAdapter } from "../adapters/drivers/authenticator-proxy";
import { DashboardApi } from "./dashboard-api";

const setup = () => {
  const controlAuthenticatorStub = new ControlAuthenticatorStub();
  const repoQuerierStub = new RepoQuerierStub();
  const dashboardApiMock = new DashboardApi(
    controlAuthenticatorStub,
    repoQuerierStub
  );

  return {
    dashboardApiMock,
  };
};

export const compositionMock = () => {
  const { dashboardApiMock } = setup();
  const authenticatorProxyAdapter = new AuthenticatorProxyAdapter(
    dashboardApiMock
  );

  return {
    authenticatorProxyAdapter,
  };
};

export const TRPCCompose = () => {
  const { dashboardApiMock } = setup();
  const trpc = initTRPC.create();
  const authTRPCAdapter = new AuthTRPCAdapter(dashboardApiMock, trpc);
  const authTRPCAdapterRouter = authTRPCAdapter.createRouter();
  const appRouter = trpc.mergeRouters(authTRPCAdapterRouter);

  return { appRouter };
};
