import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({
    name : {
        type : String,
        required : true,
        trim :true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    address : {
        type : String,
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
}, {
    versionKey : false,
    timestamps : true
})

export const User = model<IUser>("User", userSchema);