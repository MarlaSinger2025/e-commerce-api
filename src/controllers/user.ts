import type { RequestHandler } from "express";
import User from '../models/User.ts';
import {userInputSchema} from '../schemas/userSchema.ts';
import type { z } from 'zod';

// A Data Transfer Object (DTO) is a plain TypeScript type that represents the exact JSON your API sends or receives.
type UserInputDTO = z.infer<typeof userInputSchema>;
type UserDTO = UserInputDTO & { id: string };
type IdParams = { id: string};

// GET/users
export const getUsers: RequestHandler<unknown,UserInputDTO[]> = async (req, res) => {
    
        const users = await User.find().select('-password');
        res.status(200).json(users);   
};

// POST/users
export const createUser: RequestHandler<unknown, UserDTO, UserInputDTO> = async (req, res) => {
        const { email} = req.body;

    // app-layer check for a friendly 409 instead of a raw E11000 from the DB's unique index (the actual guarantee) (code from Jimena)
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error('Email already in use', { cause: { status: 409}});

    // satisfies is a TypeScript operator. It does one thing: it checks "does this value's type match/fit this other type?"  (code from Jimena)
        const user = await User.create(req.body satisfies UserInputDTO);
        res.status(201).json(user);
};

// GET/users/ :id
export const getUserById: RequestHandler<IdParams, UserInputDTO> = async (req, res ) => {
    const user = await User.findById(req.params.id);
    if (!user) throw new Error('User not found', { cause: { status: 404 }});
    res.status(200).json(user);
};

// PUT/users/ :id
// (also PATCH = partial update)
export const updateUser: RequestHandler<IdParams, UserDTO, Partial<UserInputDTO>> = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) throw new Error('User not found', { cause: { status: 404 }});
    res.status(200).json(updatedUser);
};

// DELETE/users/ :id
export const deleteUser: RequestHandler<IdParams, { message: string}> = async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) throw new Error('User not found', { cause: { status: 404}});
    res.status(200).json({ message: 'User deleted successfully' });
};