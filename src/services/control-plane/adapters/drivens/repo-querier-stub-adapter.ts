import { ExternalUser } from "../../../repository/app/schemas/user";
import { FromRepositoryUser, User } from "../../app/schemas/user";
import { ForRepositoryQuerying } from "../../ports/drivens/for-repository-querying";

const usersMock = [
  {
    id: "123",
    name: "John Doe",
    email: "johndoe@mail.com",
  },
  {
    id: "111",
    name: "Mike Doe",
    email: "mikedoe@mail.com",
  },
];

export class RepoQuerierStub implements ForRepositoryQuerying {
  getUser(email: string): Promise<FromRepositoryUser | undefined> {
    const userMock = usersMock.find((user) => user.email === email);
    if (!userMock) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(userMock);
  }

  createUser(_user: User): Promise<ExternalUser> {
    return Promise.resolve(usersMock[0]);
  }
}
