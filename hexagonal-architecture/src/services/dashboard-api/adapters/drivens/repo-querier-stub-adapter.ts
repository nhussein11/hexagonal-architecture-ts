import { ForRepositoryQuerying } from "../../ports/drivens/for-repository-querying";
import { ExternalUser } from "../../../repository/app/schemas/user";
import { User } from "../../app/schemas/user";

const userMock: ExternalUser = {
  id: "1",
  name: "Lucas",
  email: "lucas@email.com",
};

export class RepoQuerierStub implements ForRepositoryQuerying {
  getUser(_email: string): Promise<ExternalUser> {
    return Promise.resolve(userMock);
  }

  createUser(_user: User): Promise<ExternalUser> {
    return Promise.resolve(userMock);
  }
}
