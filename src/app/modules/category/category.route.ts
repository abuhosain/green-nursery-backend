import express from 'express'
import { CategoryControllers } from './category.controller'
import validateRequest from '../../middleware/validateRequest'
import { validateCategory } from './category.validation'

const router = express.Router()

// create/post category
router.post(
  '/',
  validateRequest(validateCategory.createCategoryValidation),
  CategoryControllers.createCategory,
)

// get a single category
router.get('/:categoryId', CategoryControllers.getCategoryById)

// get all category
router.get('/', CategoryControllers.getAllCategory)

// category updated successfulluy
router.put(
  '/:categoryId',
  validateRequest(validateCategory.updateCategoryValidation),
  CategoryControllers.updateCategory,
)

// delete category succesfully
router.delete(
    '/:categoryId',
    CategoryControllers.deleteCategory,
  )

export const CategoryRoutes = router
