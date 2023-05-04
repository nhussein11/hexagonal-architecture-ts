import { ExternalUser, User } from "../../app/schemas/user";

export interface ForManagingUser {
  getUser(email: string, password: string): Promise<ExternalUser>;
  createUser(user: User, password: string): Promise<ExternalUser>;
}
