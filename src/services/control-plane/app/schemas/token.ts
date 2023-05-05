import z from "zod";

export const payloadSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

export const baseTokenSchema = z.object({
  payload: payloadSchema,
  secretKey: z.string(),
});

export const tokenSchema = baseTokenSchema.extend({
  period: z.string(),
});

export type Payload = z.infer<typeof payloadSchema>;
export type BaseToken = z.infer<typeof baseTokenSchema>;
export type Token = z.infer<typeof tokenSchema>;
