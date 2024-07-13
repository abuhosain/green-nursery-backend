import { z } from 'zod'

// Define Zod schema for Product
export const createProductValidation = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    price: z.number().nonnegative('Price must be a non-negative number'),
    category: z.string().nonempty('Category ID is required'),
    quantity: z.number().nonnegative('Quantity must be a non-negative number'),
    description: z.string().optional(),
    rating: z
      .number()
      .min(0, 'Rating must be at least 0')
      .max(5, 'Rating can be at most 5')
      .optional(),
    image: z.string(),
    isDeleted: z.boolean().default(false),
  }),
})

const updateProductValidation = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').optional(),
    price: z
      .number()
      .nonnegative('Price must be a non-negative number')
      .optional(),
    category: z.string().nonempty('Category ID is required').optional(),
    quantity: z
      .number()
      .nonnegative('Quantity must be a non-negative number')
      .optional(),
    description: z.string().optional(),
    rating: z
      .number()
      .min(0, 'Rating must be at least 0')
      .max(5, 'Rating can be at most 5')
      .optional(),
    image: z.string().optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
})

export const ProductValiation = {
  createProductValidation,
  updateProductValidation
}
