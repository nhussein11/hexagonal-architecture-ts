import z from "zod";

export const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const fromRepositoryUserSchema = userSchema.extend({
  id: z.string(),
});

export type FromRepositoryUser = z.infer<typeof fromRepositoryUserSchema>;
