import { TypeOf, z } from 'zod';

export const createUserSchema = z.object({
  body: z
    .object({
      name: z.string({
        required_error: 'Name is required field',
      }),
      password: z
        .string({
          required_error: 'Password is required field',
        })
        .min(6, 'Password too short - should be 6 chars minimum!'),
      confirmPassword: z.string({
        required_error: 'confirmPassword is required field',
      }),
      email: z
        .string({
          required_error: 'email is required field',
        })
        .email('Not a valid email'),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: 'Passwords must be the same',
      path: ['confirmPassword'],
    }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
