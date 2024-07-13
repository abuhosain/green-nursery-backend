import { model, Schema } from 'mongoose'
import { IOrder } from './order.interface'
import { Product } from '../product/product.model'

const orderSchema = new Schema<IOrder>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity : {
    type : Number,
    required : true
  },
  totalPrice : {
    type : Number,
  },
  isCanceled : {
    type : Boolean,
    default : false
  }
}, {
    timestamps : true,
    versionKey : false
})

orderSchema.pre('save', async function (next) {
    if (this.isModified('quantity') || this.isNew) {
      const product = await Product.findById(this.productId)
      if (product) {
        this.totalPrice = product.price * this.quantity
      } else {
        throw new Error('Product not found')
      }
    }
    next()
  })

export const Order = model<IOrder>("Order", orderSchema)