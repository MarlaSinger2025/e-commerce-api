import z from 'zod';

export const categoryInputSchema = z.strictObject({
    name: z.string().min(2, 'Min 2 chars required')
});

export type CategoryInput = z.infer<typeof categoryInputSchema>;