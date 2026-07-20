import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/user.ts';
import { valdiateBody } from '../middleware/validateBody.ts';
import { userInputSchema, updatedUserSchema } from '../schemas/userSchema.ts';

const userRoutes = Router();

userRoutes
    .route('/')
    .get(getUsers)
    .post(valdiateBody(userInputSchema), createUser); // <- Input Validation Middleware

userRoutes
    .route('/:id')
    .get(getUserById)
    .put(valdiateBody(updatedUserSchema), updateUser) // <- Input Validation Middleware
    .delete(deleteUser);


export default userRoutes;