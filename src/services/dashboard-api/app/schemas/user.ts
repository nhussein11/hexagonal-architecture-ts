import { AuthenticationDetailsSchema, PermissionsSchema } from "./auth";
import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
});

export const AuthenticatedUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  authDetails: AuthenticationDetailsSchema,
  permissions: PermissionsSchema,
});

export type AuthenticatedUser = z.infer<typeof AuthenticatedUserSchema>;

export interface User extends Pick<AuthenticatedUser, "email" | "name"> {
  password: string;
}
