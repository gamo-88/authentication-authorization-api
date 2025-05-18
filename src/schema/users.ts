import { z } from "zod";

export const SignupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const SigninSchema = z.object({
  name: z.string(),
  password: z.string().min(6),
});
