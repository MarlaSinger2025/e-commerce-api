import { z } from 'zod';

export const userInputSchema = z.strictObject({
    name: z.string().min(2, 'Requires min 2 chars'),
    email: z.email(),
    password: z.string().min(8, 'Must be at least 8 chars')
});

export type UserInput = z.infer<typeof userInputSchema>;