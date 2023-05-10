import { initTRPC } from "@trpc/server";
import { ControlAuthenticatorStub } from "../adapters/drivens/control-authenticator-stub-adapter";
import { RepoQuerierStub } from "../adapters/drivens/repo-querier-stub-adapter";
import { AuthenticatorProxyAdapter } from "../adapters/drivers/authenticator-proxy";
import { DashboardApi } from "./dashboard-api";
import {
  AuthTRPCAdapter,
  // AuthTRPCAdapter,
  authTRPCAdapter,
} from "../adapters/drivers/auth-trpc-adapter";

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

export const { appRouter } = TRPCCompose();

export const localTRPCCompose = () => {
  // DRIVENS
  const controlAuthenticatorStub = new ControlAuthenticatorStub();
  const repoQuerierStub = new RepoQuerierStub();

  // APP
  const dashboardApiMock = new DashboardApi(
    controlAuthenticatorStub,
    repoQuerierStub
  );

  // TRPC INSTANCE
  const t = initTRPC.create();

  // TRPC DRIVER
  const authTRPCAdapterRouter = authTRPCAdapter(dashboardApiMock, t);

  const appRouter = t.mergeRouters(authTRPCAdapterRouter);

  return { appRouter };
};

// export const { appRouter } = localTRPCCompose();
