import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { ProductServices } from './product.service'

const createProduct = catchAsync(async (req, res) => {
  const product = req.body
  const result = await ProductServices.crateProductIntoDB(product)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product created successfully',
    data: result,
  })
})

//  Retrieve a List of All Products
const getAllProducts = catchAsync(async (req, res) => {
  const query = req.query
  const result = await ProductServices.getAllProductsFromDb(query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Products successfully',
    data: result,
  })
})

//  Retrieve a  Products
const getSingleProducts = catchAsync(async (req, res) => {
  const {productId} = req.params
  const result = await ProductServices.getProductByIdFromDB(productId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get a single product successfully',
    data: result,
  })
})


// update product by id
const updateProduct = catchAsync(async (req, res) => {
    const {productId} = req.params;
    const productData = req.body;
    const result = await ProductServices.updateProdcutByIdIntoDB(productId, productData )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'product updated successfully',
      data: result,
    })
  })

// update product by id
const deleteProduct = catchAsync(async (req, res) => {
    const {productId} = req.params;
    const result = await ProductServices.deleteProdcutByIdIntoDB(productId)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'product deleted successfully',
      data: result,
    })
  })

export const ProdcutControllers = {
  createProduct,
  getAllProducts,
  getSingleProducts,
  updateProduct,
  deleteProduct
}
