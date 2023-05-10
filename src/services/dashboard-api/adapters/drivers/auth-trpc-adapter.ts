import { initTRPC } from "@trpc/server";
import { DashboardApi } from "../../app/dashboard-api";
import {
  AuthenticatedUserSchema,
  RegisterSchema,
  User,
} from "../../app/schemas/user";
import { ForAuthenticating } from "../../ports/drivers/for-authenticating";

export class AuthTRPCAdapter implements ForAuthenticating {
  constructor(
    private readonly dashboardApi: DashboardApi,
    private readonly trpc: ReturnType<typeof initTRPC.create>
  ) {}

  async login(email: string, password: string) {
    return await this.dashboardApi.login(email, password);
  }

  async register(user: User) {
    return await this.dashboardApi.register(user);
  }

  createRouter() {
    return this.trpc.router({
      login: this.trpc.procedure
        .input(RegisterSchema.pick({ email: true, password: true }))
        .output(AuthenticatedUserSchema)
        .mutation(({ input }) => this.login(input.email, input.password)),
      register: this.trpc.procedure
        .input(RegisterSchema)
        .output(AuthenticatedUserSchema)
        .mutation(({ input }) => this.register(input)),
    });
  }
}

export function authTRPCAdapter(
  dashboardApi: DashboardApi,
  t: ReturnType<typeof initTRPC.create>
) {
  return t.router({
    login: t.procedure
      .input(RegisterSchema.pick({ email: true, password: true }))
      .output(AuthenticatedUserSchema)
      .mutation(({ input }) => dashboardApi.login(input.email, input.password)),
    register: t.procedure
      .input(RegisterSchema)
      .output(AuthenticatedUserSchema)
      .mutation(({ input }) => dashboardApi.register(input)),
  });
}
