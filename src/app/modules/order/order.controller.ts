import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OrderServices } from "./order.service";

const createOrder = catchAsync(async(req, res) => {
    const order = req.body;
    const result = await OrderServices.createOrderIntoDB(order);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'order created successfully',
        data: result
    });
})

// get all order from db
const getAllOrder = catchAsync(async(req, res) => {
    const result = await OrderServices.getAllOrderFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'get all order successfully',
        data: result
    });
})

// get a single order by id
const getOrderById = catchAsync(async(req, res) => {
    const {orderId} = req.params;
    const result = await OrderServices.getOrderByIdFromDB(orderId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'single order fetched successfully',
        data: result
    });
})

// update a single order by id
const updateOrderById = catchAsync(async(req, res) => {
    const {orderId} = req.params;
    const orderData = req.body;
    const result = await OrderServices.updateOrderByIdIntoDB(orderId, orderData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'order updated successfully',
        data: result
    });
})

// delete order 
const deleteOrder = catchAsync(async(req, res) => {
    const {orderId} = req.params;
    const result = await OrderServices.deleteOrderFromDB(orderId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'order deleted successfully',
        data: result
    });
})

export const OrderControllers = {
    createOrder,
    getAllOrder,
    getOrderById,
    updateOrderById,
    deleteOrder
}