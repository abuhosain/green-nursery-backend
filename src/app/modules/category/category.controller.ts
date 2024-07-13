import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CategoryServices } from "./category.service";

const createCategory = catchAsync(async (req, res) => {
    const category = req.body;
    const result = await CategoryServices.creteCategoryIntoDB(category);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category created successfully',
        data: result
    });
})

const getAllCategory = catchAsync(async (req, res) => {
    const result = await  CategoryServices.getAllCategoryFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get all category successfully',
        data: result
    });
})

const getCategoryById = catchAsync(async (req, res) => {
    const {categoryId} = req.params;
    const result = await  CategoryServices.getCategoryByIdFromDB(categoryId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get a single category successfully',
        data: result
    });
})

const updateCategory = catchAsync(async (req, res) => {
    const {categoryId} = req.params;
    const data = req.body;
    const result = await  CategoryServices.updateCategoryIntoDB(categoryId, data);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category updated successfully',
        data: result
    });
})
const deleteCategory = catchAsync(async (req, res) => {
    const {categoryId} = req.params;
    const result = await  CategoryServices.deleteCategoryFromDB(categoryId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category deleted successfully',
        data: result
    });
})

 

export const CategoryControllers = {
    createCategory,
    getAllCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
}