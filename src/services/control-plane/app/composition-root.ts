import { LoggerControlPlaneAdapter } from "../adapters/drivens/logger-adapter";
import { RepoQuerierStub } from "../adapters/drivens/repo-querier-stub-adapter";
import { AuthManagerProxy } from "../adapters/drivers/auth-manager-proxy";
import { ControlPlane } from "./control-plane";

export const compositionRoot = () => {
  const logger = new LoggerControlPlaneAdapter();
  const repository = new RepoQuerierStub();
  const controlPlane = new ControlPlane(logger, repository);

  const managerAuthenticationProxy = new AuthManagerProxy(controlPlane);

  return {
    managerAuthenticationProxy,
  };
};
