import { Router } from 'express';
import { getCategories, getCategoriesById, createCategory, updateCategory, deleteCategory } from '../controllers/category.ts';
import { valdiateBody } from '../middleware/validateBody.ts';
import { categoryInputSchema } from '../schemas/categorySchema.ts';

const categoryRoutes = Router();

categoryRoutes
    .route('/')
    .get(getCategories)
    .post(valdiateBody(categoryInputSchema), createCategory);

categoryRoutes
    .route('/:id')
    .get(getCategoriesById)
    .put(valdiateBody(categoryInputSchema), updateCategory)
    .delete(deleteCategory);

export default categoryRoutes;