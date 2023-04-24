import { User } from "../../ports/drivers/for-authenticating";
import { User as RepositoryUser } from "../../../repository/app/schemas/user";

export interface ForRepositoryQuerying {
  getUser(email: string): Promise<RepositoryUser>;
  createUser(user: User, password: string): Promise<RepositoryUser>;
}
