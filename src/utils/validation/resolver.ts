import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid Email Format.' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

const loginResolver = zodResolver(loginSchema);

export { loginResolver };
