import { z } from 'zod';


const createCategoryValidation = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required"), // Ensures 'name' is a non-empty string
        description: z.string().optional(),
        image: z.string().optional(),
        isDeleted: z.boolean().default(false),
    })
});

const updateCategoryValidation = z.object({
    body: z.object({
        name: z.string().optional(), // 'name' is optional for update
        description: z.string().optional(),
        image: z.string().optional(),
        isDeleted: z.boolean().optional(), // Allow changing the 'isDeleted' status
    })
});



// Export the schema for use in validation
export const validateCategory = {
    createCategoryValidation,
    updateCategoryValidation
};
