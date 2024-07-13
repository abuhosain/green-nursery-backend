import { model, Schema } from 'mongoose'
import { IProduct } from './product.interface'

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    image: {
      type: String,
      required: true,
    },
    isDeleted : {
      type : Boolean,
      default : false
    }
  },
  {
    versionKey: false,
  },
)

export const Product = model<IProduct>('Product', productSchema)
