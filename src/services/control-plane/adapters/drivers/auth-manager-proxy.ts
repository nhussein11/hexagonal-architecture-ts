import { ControlPlane } from "../../app/control-plane";
import { AuthenticationDetails, Permission } from "../../app/schemas/auth";
import { ForManagingAuthentication } from "../../ports/drivers/for-authenticating";

export class AuthManagerProxy implements ForManagingAuthentication {
  constructor(private readonly controlPlane: ControlPlane) {}
  getAuthenticationDetails(
    email: string,
    password: string
  ): Promise<AuthenticationDetails> {
    return Promise.resolve(
      this.controlPlane.getAuthenticationDetails(email, password)
    );
  }
  getPermission(email: string, password: string): Promise<Permission> {
    return Promise.resolve(this.controlPlane.getPermission(email, password));
  }
}
