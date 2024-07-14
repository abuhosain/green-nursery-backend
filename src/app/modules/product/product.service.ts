import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { Category } from '../category/category.model'
import { IProduct } from './product.interface'
import { Product } from './product.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { productSearchableField } from './product.constant'

// create product into db
const crateProductIntoDB = async (payload: IProduct) => {
  const category = await Category.findById(payload.category)
  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category is not found')
  }

  const result = await Product.create(payload)
  return result
}

// get all product from db
const getAllProductsFromDb = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Product.find({isDeleted : {$ne : true}}).populate('category'),
    query,
  )
    .search(productSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields()
  const result = await facultyQuery.modelQuery
  return result
}

// get a single products by id
const getProductByIdFromDB = async (id: string) => {
  const result = await Product.findById(id).populate('category')
  return result
}

// update a product into db
const updateProdcutByIdIntoDB = async (
  id: string,
  payload: Partial<IProduct>,
) => {
  const result = await Product.findByIdAndUpdate(id, payload, { new: true })
  return result
}

// update a product into db
const deleteProdcutByIdIntoDB = async (id: string) => {
  const result = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return result
}

export const ProductServices = {
  crateProductIntoDB,
  getAllProductsFromDb,
  getProductByIdFromDB,
  updateProdcutByIdIntoDB,
  deleteProdcutByIdIntoDB,
}
