import { ICategory } from './category.interface'
import { Category } from './category.model'

const creteCategoryIntoDB = async (payload: ICategory) => {
  const result = await Category.create(payload)
  return result
}

const getAllCategoryFromDB = async () => {
  const result = await Category.find({ isDeleted: { $ne: true } })
  return result
}

const getCategoryByIdFromDB = async (id: string) => {
  const result = await Category.findById(id)
  return result
}

const updateCategoryIntoDB = async (
  id: string,
  payload: Partial<ICategory>,
) => {
  const result = await Category.findByIdAndUpdate(id, payload, { new: true })
  return result
}

const deleteCategoryFromDB = async (id: string) => {
  const result = await Category.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return result;
}

export const CategoryServices = {
  creteCategoryIntoDB,
  getAllCategoryFromDB,
  getCategoryByIdFromDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB
}
