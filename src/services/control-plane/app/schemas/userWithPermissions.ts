import { Permission } from "./auth";

export interface userWithPermission {
  [userId: string]: Permission;
}
