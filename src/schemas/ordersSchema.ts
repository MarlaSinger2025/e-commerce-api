import {z} from "zod" ;
import { Types } from 'mongoose';


const productOrderSchema = z.strictObject({
    productId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid ObjectId'}),
    quantity: z.number().positive().int('Value must be a whole number')
});

export const orderInputSchema = z.strictObject({
    userId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid ObjectId'}),
    products: z.array(productOrderSchema)
});

// export const updatedOrderInputSchema = orderInputSchema.partial();

// export type UpdatedOrderInput = z.infer<typeof updatedOrderInputSchema>;

export type OrderInput = z.infer<typeof orderInputSchema>;