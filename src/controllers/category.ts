import type { RequestHandler } from "express";
import Category from '../models/Category.ts';
import { categoryInputSchema } from "../schemas/categorySchema.ts";
import type { z } from 'zod';

type CategoryInputDTO = z.infer<typeof categoryInputSchema>;
type CatergoryDTO = CategoryInputDTO & { id: string };
type IdParams = { id: string };

//GET /categories (all)
export const getCategories : RequestHandler<unknown, CategoryInputDTO[]> = async (req, res) => {

    const categories = await Category.find();
    res.status(200).json(categories);
};

//POST /categories
export const createCategory : RequestHandler<unknown, CatergoryDTO , CategoryInputDTO> = async (req, res) => {
   
        const category = await Category.create(req.body satisfies CategoryInputDTO);
    res.status(200).json(category);
};


//GET /categories/ :id
export const getCategoriesById : RequestHandler<IdParams, CategoryInputDTO> = async (req, res) => {

    const category = await Category.findById(req.params.id);
    if (!category) throw new Error('Category not found', { cause: { status: 404}});
    res.status(200).json(category);
};

//Put /categories :id
export const updateCategory : RequestHandler<IdParams, CatergoryDTO, CategoryInputDTO> = async (req, res) => {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true});
    if (!updatedCategory) throw new Error('Category not found', {cause: { status: 404}});
    res.status(200).json(updatedCategory);
};

//DELETE /categories :id
export const deleteCategory : RequestHandler<IdParams, {message: string}> = async (req, res) => {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) throw new Error('Category not found', {cause: { status: 404}});
    res.status(200).json({ message: 'Category deleted successfully'});

};

