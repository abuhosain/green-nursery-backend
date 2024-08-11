import { z } from 'zod';

// Order creation validation schema
const createOrderSchema = z.object({
  body: z.object({
    userId: z.string().optional(), 
    productId: z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
      message: 'Invalid product ID',
    }),
    quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
    customerName: z.string().min(1, { message: 'Customer name is required' }),
    customerPhone: z.string().min(1, { message: 'Customer phone is required' }),
    customerAddress: z.string().min(1, { message: 'Customer address is required' }),
  }),
});

// Order update validation schema
const updateOrderSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    productId: z.string().optional(),
    quantity: z.number().min(1, { message: 'Quantity must be at least 1' }).optional(),
    isCanceled: z.boolean().default(false).optional(),
    customerName: z.string().optional(),
    customerPhone: z.string().optional(),
    customerAddress: z.string().optional(),
  }),
});

export const OrderValidation = {
  createOrderSchema,
  updateOrderSchema,
};
