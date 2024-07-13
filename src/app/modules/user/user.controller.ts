import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createUser = catchAsync(async (req, res) => {
    const user = req.body;
    const result = await UserServices.createUserIntoDB(user)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'user is created successfully',
        data: result,
      })
})

const updateUser = catchAsync(async (req, res) => {
    const {userId} = req.params;
    const user = req.body;
    const result = await UserServices.updateUserFromDB(userId, user)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'user is updated successfully',
        data: result,
      })
})

export const UserControllers = {
    createUser,
    updateUser
}