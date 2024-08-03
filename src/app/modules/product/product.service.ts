import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { Category } from '../category/category.model'
import { IProduct } from './product.interface'
import { Product } from './product.model'
import { QueryBuilder } from '../../builder/QueryBuilder'


// const productSearchableField = ['title', 'description'] // Adjust based on your schema

// interface ProductQuery {
//   searchTerm?: string
//   category?: string
//   minPrice?: number
//   maxPrice?: number
//   rating?: number
//   sort?: string
//   limit?: number
//   page?: number
//   fields?: string
// }

// create product into db
const crateProductIntoDB = async (payload: IProduct) => {
  const category = await Category.findById(payload.category)
  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category is not found')
  }

  const result = await Product.create(payload)
  return result
}

const getAllProductsFromDb = async (query: Record<string, unknown>) => {
  try {
    const queryBuilder = new QueryBuilder<IProduct>(
      Product.find({ isDeleted: { $ne: true } }).populate('category'), // Ensure 'category' is populated
      query
    )
      .search(['title', 'description'])
      .filter()
      .sort()
      .paginate()
      .fields();

    // Apply category filter if provided
    if (query.category) {
      queryBuilder.modelQuery = queryBuilder.modelQuery.find({
        'category.name': query.category  // Adjust this if you store categories differently
      });
    }

    const result = await queryBuilder.modelQuery.exec();
    return result;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};



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
