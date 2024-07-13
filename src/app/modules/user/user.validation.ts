import { z } from 'zod'

// Define Zod schema for creating a User
 const createUserValidation = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    address: z.string().optional(),
    isDeleted: z.boolean().default(false),
  }),
})

const updateUserValidation = z.object({
    body: z.object({
      name: z.string().optional(),
      email: z.string().email('Invalid email address').optional(),
      address: z.string().optional(),
      isDeleted: z.boolean().default(false).optional(),
    }),
  })


 export const UserValidation = {
    createUserValidation,
    updateUserValidation
  }