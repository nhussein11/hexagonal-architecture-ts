import { describe, it, expect } from "vitest";
import { UserManagerProxy } from "../adapters/drivers/user-manager-proxy";
import { Repository } from "./repository";
import { LoggerStubAdapter } from "../adapters/drivens/logger-stub-adapter";

describe("repository", () => {
  const logger = new LoggerStubAdapter();
  const repository = new Repository(logger);

  const userManagerProxy = new UserManagerProxy(repository);
  it.concurrent("should not get user", async () => {
    const mailMock = "lucas@email.com";

    const expectedResult = {
      id: "1",
      name: "lucas",
      email: mailMock,
    };
    let result;
    try {
      result = await userManagerProxy.getUser(mailMock);
    } catch (error) {}

    expect(result).not.toEqual(expectedResult);
  });
  it.concurrent("should create user", async () => {
    const userMock = {
      name: "lucas",
      email: "lucas@email.com",
      password: "123456",
    };

    let result;
    try {
      result = await userManagerProxy.createUser(userMock);
    } catch (error) {}

    const { password, ...userMockWithoutPassword } = userMock;
    const expectedResult = {
      id: "1",
      ...userMockWithoutPassword,
    };

    expect(result).toEqual(expectedResult);
  });

  it.concurrent("should control that the user already exists", async () => {
    const userMock = {
      name: "lucas",
      email: "lucas@email.com",
      password: "123456",
    };

    let result;
    try {
      result = await userManagerProxy.createUser(userMock);
    } catch (error) {}

    expect(result).toBeUndefined();
  });
  it.concurrent("should get user", async () => {
    const mailMock = "lucas@email.com";

    const expectedResult = {
      id: "1",
      name: "lucas",
      email: mailMock,
      password: "123456",
    };

    let result;
    try {
      result = await userManagerProxy.getUser(mailMock);
    } catch (error) {}

    expect(result).toEqual(expectedResult);
  });
});
