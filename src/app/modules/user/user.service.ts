import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async(payload : IUser) => {
    const email = await User.findOne({email : payload.email});
    if(email){
        throw new AppError(httpStatus.BAD_REQUEST, "email is already used")
    }
    const result = await User.create(payload);
    return result;
}

const updateUserFromDB = async(id : string, payload : Partial<IUser>) => {
    const result = await User.findByIdAndUpdate(id, payload, {new : true});
    return result;
}

export const UserServices = {
    createUserIntoDB,
    updateUserFromDB
}