import { RepoUser } from "../../../repository/app/schemas/user";
import { User } from "../../app/schemas/user";

export interface ForRepositoryQuerying {
  getUser(email: string): Promise<RepoUser>;
  createUser(user: User): Promise<RepoUser>;
}
