import { initTRPC } from "@trpc/server";
import { DashboardApi } from "../../app/dashboard-api";
import {
  AuthenticatedUserSchema,
  RegisterSchema,
} from "../../app/schemas/user";

// TODO: implement ForAuthenticating
export function authTRPCAdapter(
  dashboardApi: DashboardApi,
  trpc: ReturnType<typeof initTRPC.create>
) {
  return trpc.router({
    login: trpc.procedure
      .input(RegisterSchema.pick({ email: true, password: true }))
      .output(AuthenticatedUserSchema)
      .mutation(({ input }) => dashboardApi.login(input.email, input.password)),

    register: trpc.procedure
      .input(RegisterSchema)
      .output(AuthenticatedUserSchema)
      .mutation(({ input }) => dashboardApi.register(input)),
  });
}
