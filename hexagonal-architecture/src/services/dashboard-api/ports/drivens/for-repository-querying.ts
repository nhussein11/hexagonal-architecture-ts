import { User } from "services/dashboard-api/app/schemas/user";
import { User as RepositoryUser } from "../../../repository/app/schemas/user";

export interface ForRepositoryQuerying {
  getUser(email: string): Promise<RepositoryUser>;
  createUser(user: User, password: string): Promise<RepositoryUser>;
}
