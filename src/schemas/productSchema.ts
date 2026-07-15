import { z } from 'zod';

export const productInputSchema = z.strictObject({
    name: z.string().min(2, 'Requires min 2 chars'),
    description: z.string().min(2, 'Requires min 2 chars'),
    price: z.number().nonnegative(), //Number must be greater than or equal to 0
    //categoryId: z.string() //Is this right? 
});

// Schema for Product update - partial() makes every input field optial
export const updatedProductSchema = productInputSchema.partial();

export type UpdatedProductInput = z.infer<typeof updatedProductSchema>;
export type ProductInput = z.infer<typeof productInputSchema>;