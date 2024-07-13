import express from 'express'
import { ProdcutControllers } from './product.controller'
import validateRequest from '../../middleware/validateRequest'
import { ProductValiation } from './product.validation'
const router = express.Router()

// create product
router.post(
  '/',
  validateRequest(ProductValiation.createProductValidation),
  ProdcutControllers.createProduct,
)

// get single product
router.get('/:productId', ProdcutControllers.getSingleProducts)

// get all prodcut
router.get('/', ProdcutControllers.getAllProducts)

// update product
router.put(
  '/:productId',
  validateRequest(ProductValiation.updateProductValidation),
  ProdcutControllers.updateProduct,
)

// update product
router.delete(
  '/:productId',
  ProdcutControllers.deleteProduct,
)

 

export const ProductRoutes = router
