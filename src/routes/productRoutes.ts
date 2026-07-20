import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/product.ts';
import { valdiateBody } from '../middleware/validateBody.ts';
import { productInputSchema, updatedProductSchema } from '../schemas/productSchema.ts';

const productRoutes = Router();

productRoutes
    .route('/')
    .get(getProducts)
    .post(valdiateBody(productInputSchema), createProduct);

productRoutes
    .route('/:id')
    .get(getProductById)
    .put(valdiateBody(updatedProductSchema), updateProduct)
    .delete(deleteProduct);

export default productRoutes;