import { Router } from "express";
import { valdiateBody } from "../middleware/validateBody.ts";
import { orderInputSchema } from "../schemas/ordersSchema.ts";
import { getOrders, getOrderById, createOrder, updatedOrder, deleteOrder } from "../controllers/order.ts";

const orderRoutes = Router();

orderRoutes
    .route('/')
    .get(getOrders)
    .post(valdiateBody(orderInputSchema), createOrder);

orderRoutes
    .route('/:id')
    .get(getOrderById)
    .put(valdiateBody(orderInputSchema), updatedOrder)
    .delete(deleteOrder);

export default orderRoutes;