import { ExternalUser } from "../../../repository/app/schemas/user";
import { User } from "../../app/schemas/user";

export interface ForRepositoryQuerying {
  getUser(email: string): Promise<ExternalUser>;
  createUser(user: User): Promise<ExternalUser>;
}
