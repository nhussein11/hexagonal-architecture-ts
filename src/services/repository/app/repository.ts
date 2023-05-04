import { ForMonitoring } from "../ports/drivens/for-monitoring";
import { ForManagingUser } from "../ports/drivers/for-managing-user";
import { ExternalUser, RepoUser, User } from "./schemas/user";

export class Repository implements ForManagingUser {
  private userList: RepoUser[] = [];
  constructor(private readonly logger: ForMonitoring) {}

  async getUser(email: string): Promise<ExternalUser> {
    const user = this.userList.find((user: RepoUser) => user.email === email);
    if (!user) {
      this.logger.log("Get User", "User not found");
      throw new Error("User not found");
    }

    return user;
  }

  async createUser(user: User): Promise<ExternalUser> {
    const userExist = this.userList.find((user) => user.email === user.email);
    if (userExist) {
      this.logger.log("Create User", "User already exists");
      throw new Error("User already exists");
    }

    const newUser = {
      ...user,
      id: (this.userList.length + 1).toString(),
    };

    this.userList.push(newUser);
    this.logger.log("Create User", "User created");

    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
}
