import { Repository } from "../../app/repository";
import { ExternalUser, User } from "../../app/schemas/user";
import { ForManagingUser } from "../../ports/drivers/for-managing-user";

export class UserManagerProxy implements ForManagingUser {
  constructor(private readonly repository: Repository) {}
  getUser(email: string, password: string): Promise<ExternalUser> {
    return Promise.resolve(this.repository.getUser(email, password));
  }
  createUser(user: User): Promise<ExternalUser> {
    return Promise.resolve(this.repository.createUser(user));
  }
}
