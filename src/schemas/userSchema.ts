import { z } from 'zod';

export const userInputSchema = z.strictObject({
    name: z.string().min(2, 'Requires min 2 chars'),
    email: z.email(),
    password: z.string().min(8, 'Must be at least 8 chars')
});

// Schema for User update - partial() makes every input field optial
export const updatedUserSchema = userInputSchema.partial();


export type UpdatedUserInput = z.infer<typeof updatedUserSchema>;
export type UserInput = z.infer<typeof userInputSchema>;