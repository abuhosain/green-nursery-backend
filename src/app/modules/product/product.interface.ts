import { ObjectId } from "mongoose";

export interface IProduct {
    title: string;
    price: number;
    category: ObjectId;
    quantity: number;
    description?: string;
    rating?: number;
    image: string;
    isDeleted : boolean;
  }