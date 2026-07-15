import z from 'zod';

export const categoryInputSchema = z.strictObject({
    name: z.string().min(2, 'Min 2 chars required').transform((val) => //transform takes the first character, uppercases it, then lowercases everything else. 
                val.charAt(0).toUpperCase() + val.slice(1).toLowerCase())
});

export type CategoryInput = z.infer<typeof categoryInputSchema>;