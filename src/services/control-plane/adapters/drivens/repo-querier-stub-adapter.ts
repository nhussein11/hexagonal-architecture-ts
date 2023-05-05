import { ExternalUser } from "../../../repository/app/schemas/user";
import { FromRepositoryUser, User } from "../../app/schemas/user";
import { ForRepositoryQuerying } from "../../ports/drivens/for-repository-querying";

const userMock = {
  id: "123",
  name: "John Doe",
  email: "johndoe@mail.com",
};

export class RepoQuerierStub implements ForRepositoryQuerying {
  getUser(email: string): Promise<FromRepositoryUser | undefined> {
    if (email !== userMock.email) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(userMock);
  }

  createUser(_user: User): Promise<ExternalUser> {
    return Promise.resolve(userMock);
  }
}
