import { model, Schema } from "mongoose";
import { ICategory } from "./category.interface";

const categorySchema = new Schema<ICategory>({
    name : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    description : {
        type : String,
    },
    image : {
        type : String
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
}, {
    timestamps : true,
    versionKey : false
})

export const Category = model<ICategory>("Category", categorySchema);