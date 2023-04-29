import { z } from "zod";

export const AuthenticationDetailsSchema = z.object({
  token: z.string(),
  refreshToken: z.string(),
});

export const PermissionsSchema = z.object({
  admin: z.boolean(),
  user: z.boolean(),
});

export type AuthenticationDetails = z.infer<typeof AuthenticationDetailsSchema>;
export type Permissions = z.infer<typeof PermissionsSchema>;
