"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticatorProxyAdapter = void 0;
const control_authenticator_stub_adapter_1 = require("../adapters/drivens/control-authenticator-stub-adapter");
const repo_querier_stub_adapter_1 = require("../adapters/drivens/repo-querier-stub-adapter");
const authenticator_proxy_1 = require("../adapters/drivers/authenticator-proxy");
const dashboard_api_1 = require("./dashboard-api");
const compositionMock = () => {
    const controlAuthenticatorStub = new control_authenticator_stub_adapter_1.ControlAuthenticatorStub();
    const repoQuerierStub = new repo_querier_stub_adapter_1.RepoQuerierStub();
    const dashboardApiMock = new dashboard_api_1.DashboardApi(controlAuthenticatorStub, repoQuerierStub);
    const authenticatorProxyAdapter = new authenticator_proxy_1.AuthenticatorProxyAdapter(dashboardApiMock);
    return {
        authenticatorProxyAdapter,
    };
};
exports.authenticatorProxyAdapter = compositionMock().authenticatorProxyAdapter;
const registerMock = { name: "john", email: "john@mal.com" };
exports.authenticatorProxyAdapter.login("john@gmail.com", "1234");
exports.authenticatorProxyAdapter.register(registerMock, "1234");
