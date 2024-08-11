// order.model.ts

import { model, Schema } from 'mongoose';
import { IOrder } from './order.interface';
import { Product } from '../product/product.model';

const orderSchema = new Schema<IOrder>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
  },
  isCanceled: {
    type: Boolean,
    default: false,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: String,
    required: true,
  },
  customerAddress: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

orderSchema.pre('save', async function (next) {
  if (this.isModified('quantity') || this.isNew) {
    const product = await Product.findById(this.productId);
    if (product) {
      if (product.quantity < this.quantity) {
        throw new Error('Not enough product quantity available');
      }
      this.totalPrice = product.price * this.quantity;
    } else {
      throw new Error('Product not found');
    }
  }
  next();
});

orderSchema.post('save', async function () {
  const product = await Product.findById(this.productId);
  if (product) {
    product.quantity -= this.quantity;
    await product.save();
  }
});

export const Order = model<IOrder>('Order', orderSchema);
