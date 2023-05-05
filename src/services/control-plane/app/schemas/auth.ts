import z from "zod";

export const authenticationDetailsSchema = z.object({
  token: z.string(),
  refreshToken: z.string(),
});

export const permissionSchema = z.object({
  admin: z.boolean(),
  user: z.boolean(),
});

export const userWithPermissionSchema = z.record(permissionSchema);

export type AuthenticationDetails = z.infer<typeof authenticationDetailsSchema>;
export type Permission = z.infer<typeof permissionSchema>;
export type UserWithPermission = z.infer<typeof userWithPermissionSchema>;
