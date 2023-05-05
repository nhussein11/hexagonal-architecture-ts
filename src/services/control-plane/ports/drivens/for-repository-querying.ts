import { FromRepositoryUser, User } from "../../app/schemas/user";

export interface ForRepositoryQuerying {
  getUser(email: string, password: string): Promise<FromRepositoryUser>;
  createUser(user: User): Promise<FromRepositoryUser>;
}
