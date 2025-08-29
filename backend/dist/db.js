import mongoose from "mongoose";
import { model, Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
mongoose.connect(process.env.MONGO_URI);
const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: String
});
export const UserModel = model("User", UserSchema);
// const Tagschema=new Schema({
//     name:{type:String,required:true,unique:true}
// });
// export const TagModel=model("Tag",Tagschema);
const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
    type: String,
    userId: { type: mongoose.Types.ObjectId, ref: 'User',
        required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const LinksSchema = new Schema({
    hash: String,
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true, unique: true }
});
export const LinkModel = model("Links", LinksSchema);
export const ContentModel = model("Content", ContentSchema);
//# sourceMappingURL=db.js.map