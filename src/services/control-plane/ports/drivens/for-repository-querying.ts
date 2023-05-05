import { FromRepositoryUser, User } from "../../app/schemas/user";

export interface ForRepositoryQuerying {
  getUser(
    email: string,
    password: string
  ): Promise<FromRepositoryUser | undefined>;
  createUser(user: User): Promise<FromRepositoryUser>;
}
