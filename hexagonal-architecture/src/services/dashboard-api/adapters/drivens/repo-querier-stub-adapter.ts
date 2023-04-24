import { ForRepositoryQuerying } from "../../ports/drivens/for-repository-querying";
import { User as RepoUser } from "../../../repository/app/schemas/user";

const userMock: RepoUser = {
  id: "1",
  name: "John Doe",
  email: "johndoe@email.com",
};

export class RepoQuerierStub implements ForRepositoryQuerying {
  getUser(_email: string): Promise<RepoUser> {
    return Promise.resolve(userMock);
  }

  //TODO: type _user
  createUser(_user: any, _password: string): Promise<RepoUser> {
    return Promise.resolve(userMock);
  }
}
