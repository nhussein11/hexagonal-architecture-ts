export interface User {
  name: string;
  email: string;
  password: string;
}

export interface FromRepositoryUser extends Omit<User, "password"> {
  id: string;
}
