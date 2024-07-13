import express from "express";
import { OrderControllers } from "./order.controller";
import validateRequest from "../../middleware/validateRequest";
import { OrderValidation } from "./order.valition";

const router = express.Router();

// create order
router.post("/", validateRequest(OrderValidation.createOrderSchema), OrderControllers.createOrder)

// get all order
router.get("/", OrderControllers.getAllOrder);

// get single order by id
router.get("/:orderId", OrderControllers.getOrderById);

// get single order by id
router.put("/:orderId", validateRequest(OrderValidation.updateOrderSchema), OrderControllers.updateOrderById);

// get single order by id
router.delete("/:orderId",OrderControllers.deleteOrder);



export const OrderRoutes = router;