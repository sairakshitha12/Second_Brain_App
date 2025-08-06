import mongoose from "mongoose";
import {model,Schema} from "mongoose";

mongoose.connect("mongodb+srv://admin:R8hWeJA7WbnWPrE4@cluster0.rpqha23.mongodb.net/brainly")

const UserSchema=new Schema({
    username: {type:String,unique:true},
    password: String
})
export const UserModel= model("User",UserSchema)


const ContentSchema=new Schema({
    title:String,
    link:String,
    tags:[{type:mongoose.Types.ObjectId,ref:'Tag'}],
    userId:{type:mongoose.Types.ObjectId,ref:'User',
        required:true}
})

export const ContentModel=model ("Content",ContentSchema);