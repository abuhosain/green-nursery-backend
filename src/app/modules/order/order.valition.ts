import { z } from 'zod'

// Order creation validation schema
const createOrderSchema = z.object({
  body : z.object({
    userId: z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
        message: 'Invalid user ID',
      }),
      productId: z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
        message: 'Invalid product ID',
      }),
      quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
      // totalPrice and isCanceled are handled automatically
  })
})

// Order update validation schema
const updateOrderSchema = z.object({
   body : z.object({
    userId: z.string().optional(),
    product: z.string().optional(),
    quantity: z.number().min(1, { message: 'Quantity must be at least 1' }).optional(),
    isCanceled: z.boolean().default(false).optional(),
   })
  })


export const OrderValidation = {
    createOrderSchema,
    updateOrderSchema
}