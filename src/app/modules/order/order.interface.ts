import { Types } from "mongoose";

export interface IOrder {
  userId?: Types.ObjectId;
  productId: Types.ObjectId;
  quantity: number;
  customerName: string;
  customerPhone:  string;
  customerAddress: string;
  totalPrice?: number;
  isCanceled?: boolean;
}