import { LoggerRepositoryAdapater } from "../adapters/drivens/logger-adapter";
import { UserManagerProxy } from "../adapters/drivers/user-manager-proxy";
import { Repository } from "./repository";

export const compositionMock = () => {
  const monitorStub = new LoggerRepositoryAdapater();
  const repositoryMock = new Repository(monitorStub);

  const userManagerProxy = new UserManagerProxy(repositoryMock);

  return { userManagerProxy };
};

export const { userManagerProxy } = compositionMock();

const userMock = {
  name: "lucas",
  email: "lucas@mail.com",
  password: "123456",
};
const { password: passwordMock, email: emailMock } = userMock;

userManagerProxy.getUser(emailMock, passwordMock);
userManagerProxy.createUser(userMock);
