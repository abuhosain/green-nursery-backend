import { Types } from "mongoose";

export interface IOrder {
  userId?: Types.ObjectId;
  productId: Types.ObjectId;
  quantity: number;
  totalPrice?: number;
  isCanceled?: boolean;
}