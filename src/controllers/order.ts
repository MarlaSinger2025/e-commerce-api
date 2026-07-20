import type { RequestHandler } from "express";
import type {z } from 'zod';
import mongoose from 'mongoose';
import Order from "../models/Order.ts";
import { orderInputSchema } from "../schemas/ordersSchema.ts";
import User from '../models/User.ts';
import Product from '../models/Product.ts';

type OrderInputDTO = z.infer<typeof orderInputSchema>;
type OrderDTO = OrderInputDTO & { id: string};
type IdParams = { id: string};

//GET /orders
export const getOrders: RequestHandler<unknown, OrderInputDTO[]> = async (req, res) => {

    const orders = await Order.find();
    res.status(200).json(orders.map((order) => order.toJSON() as unknown as OrderDTO));

};

//POST /orders
export const createOrder: RequestHandler<unknown, OrderDTO, OrderInputDTO> = async (req, res) => {

    const {userId, products: orderedProducts } = req.body;

    // 1.) Validate userId format + exisitence
    if(!mongoose.Types.ObjectId.isValid(userId)) throw new Error('Invalid userId format!', {cause: { status: 400}})

    const userExists = await User.findById(new mongoose.Types.ObjectId(userId));
    if(!userExists) throw new Error('User not found!', {cause: { status: 404}});

    //2. Validate every productId format
    const invalidId = orderedProducts.find((item) => !mongoose.Types.ObjectId.isValid(item.productId));
    if(invalidId) throw new Error('Invalid productId format!', {cause: { status: 400}});

    //3. Fetch all matching products in one query
    const productIds = req.body.products.map((item) => item.productId);
    const foundProducts = await Product.find({ _id: { $in: productIds}});

    //4. Confirm every requested productId actually exists
    if (foundProducts.length !== productIds.length) {
        throw new Error('One or more products not found', {cause: { status: 404}})
    }

    //5. Build a Map for 0(1) price lookups by productId
    const priceMap = new Map(foundProducts.map((product) => [product._id.toString(), product.price]));

    //6. Calculate Total: price * quantity , summed across all order lines
    const total = orderedProducts.reduce((sum, item) => {
        const price = priceMap.get(item.productId.toString())!;
        return sum + price * item.quantity; },0);

    //7. Create the Order    
    const order = await Order.create({ userId, products: orderedProducts, total});
    res.status(201).json(order.toJSON() as unknown as OrderDTO);
};

//GET /orders /:id
export const getOrderById: RequestHandler<IdParams, OrderInputDTO> = async (req, res ) => {
    const order = await Order.findById(req.params.id);
    if (!order) throw new Error('Order not found', { cause: { status: 404 }});
    res.status(200).json(order.toJSON() as unknown as OrderDTO);
};

//PUT /orders /:id
// Right now every field needs to be filled out again if you want to update an Order,
// gonna change this later to some fields being optional
export const updatedOrder: RequestHandler<IdParams, OrderDTO, OrderInputDTO> = async (req, res) => {

    const {userId, products: orderedProducts } = req.body;

    // 1.) Validate userId format + exisitence
    if(!mongoose.Types.ObjectId.isValid(userId)) throw new Error('Invalid userId format!', {cause: { status: 400}})

    const userExists = await User.findById(new mongoose.Types.ObjectId(userId));
    if(!userExists) throw new Error('User not found!', {cause: { status: 404}});

    //2. Validate every productId format
    const invalidId = orderedProducts.find((item) => !mongoose.Types.ObjectId.isValid(item.productId));
    if(invalidId) throw new Error('Invalid productId format!', {cause: { status: 400}});

    //3. Fetch all matching products in one query
    const productIds = req.body.products.map((item) => item.productId);
    const foundProducts = await Product.find({ _id: { $in: productIds}});

    //4. Confirm every requested productId actually exists
    if (foundProducts.length !== productIds.length) {
        throw new Error('One or more products not found', {cause: { status: 404}})
    }

    //5. Build a Map for 0(1) price lookups by productId
    const priceMap = new Map(foundProducts.map((product) => [product._id.toString(), product.price]));

    //6. Calculate Total: price * quantity , summed across all order lines
    const total = orderedProducts.reduce((sum, item) => {
        const price = priceMap.get(item.productId.toString())!;
        return sum + price * item.quantity; },0);

    //7. Confirm OrderId and update Order
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {...req.body, total}, {new: true});
    if(!updatedOrder) throw new Error('Order not found', {cause: { status: 404}});
    res.status(200).json(updatedOrder.toJSON() as unknown as OrderDTO);

};

//DELETE /orders /:id
export const deleteOrder : RequestHandler<IdParams, {message: string}> = async (req, res) => {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if(!deletedOrder) throw new Error('Oder not found', { cause: { status: 404}});
    res.status(200).json({ message: 'Order deleted successfully!'});
};