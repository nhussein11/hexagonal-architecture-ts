import { AuthenticatedDetailsSchema, PermissionsSchema } from "./auth";
import { z } from "zod";

export const AuthenticatedUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  // TODO: This should use AuthenticatedDetailsSchema, instead of duplicating token and refreshToken fields
  authDetails: AuthenticatedDetailsSchema,
  permissions: PermissionsSchema,
});

export type AuthenticatedUser = z.infer<typeof AuthenticatedUserSchema>;

export interface User extends Pick<AuthenticatedUser, "email" | "name"> {
  password: string;
}
