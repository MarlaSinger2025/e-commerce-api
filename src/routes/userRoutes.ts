import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '#controllers/user';
import { valdiateBody } from '#middleware/validateBody';
import { userInputSchema } from '#schemas/userSchema';

const userRoutes = Router();

userRoutes
    .route('/')
    .get(getUsers)
    .post(valdiateBody(userInputSchema), createUser); // <- Input Validation Middleware

userRoutes
    .route('/:id')
    .get(getUserById)
    .put(valdiateBody(userInputSchema), updateUser) // <- Input Validation Middleware
    .delete(deleteUser);


export default userRoutes;