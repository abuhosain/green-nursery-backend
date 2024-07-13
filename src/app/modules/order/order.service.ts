import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { IOrder } from './order.interface'
import { Order } from './order.model'
import { Product } from '../product/product.model'

const createOrderIntoDB = async (payload: IOrder) => {
  const result = await Order.create(payload)
  return result
}

//  find order by id
const getOrderByIdFromDB = async (id: string) => {
  const result = await Order.findById(id).populate({
    path: 'productId',
    populate: {
      path: 'category',
    },
  })
  return result
}

// get all order from db
const getAllOrderFromDB = async () => {
  const result = await Order.find({ isCanceled: { $ne: true } }).populate({
    path: 'productId',
    populate: {
      path: 'category',
    },
  })
  return result
}

const updateOrderByIdIntoDB = async (id: string, payload: Partial<IOrder>) => {
  // Fetch the current order
  const currentOrder = await Order.findById(id)

  if (!currentOrder) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found')
  }

  // Check if quantity or product is being updated
  if (payload.quantity || payload.productId) {
    const productId = payload.productId || currentOrder.productId
    const product = await Product.findById(productId)
    if (!product) {
      throw new Error('Product not found')
    }

    // Use updated quantity if provided, otherwise use current quantity
    const quantity = payload.quantity || currentOrder.quantity
    payload.totalPrice = product.price * quantity
  }

  const result = await Order.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found')
  }
  return result
}

// delete order from db
const deleteOrderFromDB = async (id : string) => {
    const result = await Order.findByIdAndUpdate(id, {isCanceled : true}, {new : true});

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Order not found')
    }
    return result;
}

export const OrderServices = {
  createOrderIntoDB,
  getAllOrderFromDB,
  getOrderByIdFromDB,
  updateOrderByIdIntoDB,
  deleteOrderFromDB
}
