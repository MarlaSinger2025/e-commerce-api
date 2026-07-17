import type { RequestHandler } from "express";
import Product from "../models/Product.ts";
import { productInputSchema } from "../schemas/productSchema.ts";
import type { z } from 'zod';

// A Data Transfer Object (DTO) is a plain TypeScript type that represents the exact JSON your API sends or receives.
type ProductInputDTO = z.infer<typeof productInputSchema>;
type ProductDTO = ProductInputDTO & { id: string };
type IdParams = { id: string};


// GET/products
export const getProducts: RequestHandler<unknown,ProductInputDTO[]> = async (req, res) => {
    
        const products = await Product.find().select('-password');
        res.status(200).json(products);   
};

// POST/products
export const createProduct: RequestHandler<unknown, ProductDTO, ProductInputDTO> = async (req, res) => {
        
        const product = await Product.create(req.body satisfies ProductInputDTO);
        res.status(201).json(product);
};

// GET/products/ :id
export const getProductById: RequestHandler<IdParams, ProductInputDTO> = async (req, res ) => {
    const product = await Product.findById(req.params.id);
    if (!product) throw new Error('Product not found', { cause: { status: 404 }});
    res.status(200).json(product);
};

// PUT/products/ :id
// (also PATCH = partial update)
export const updateProduct: RequestHandler<IdParams, ProductDTO, Partial<ProductInputDTO>> = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) throw new Error('Product not found', { cause: { status: 404 }});
    res.status(200).json(updatedProduct);
};

// DELETE/products/ :id
export const deleteProduct: RequestHandler<IdParams, { message: string}> = async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) throw new Error('Product not found', { cause: { status: 404}});
    res.status(200).json({ message: 'Product deleted successfully' });
};