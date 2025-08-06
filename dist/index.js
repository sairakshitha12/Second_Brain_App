import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ContentModel, UserModel } from "./db.js";
import { JWT_PASSWORD } from "./config.js";
import { userMiddleware } from "./middleware.js";
const app = express();
app.use(express.json());
app.post("/api/v1/signup", async (req, res) => {
    //zod validation
    const username = req.body.username;
    const password = req.body.password;
    try {
        await UserModel.create({
            username: username,
            password: password
        });
        res.json({
            message: "User signed up"
        });
    }
    catch (e) {
        res.status(411).json({
            msg: "user already exist"
        });
    }
});
app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await UserModel.findOne({
        username,
        password
    });
    if (existingUser) {
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_PASSWORD);
        res.json({
            token,
            msg: "signin seccessfull"
        });
    }
    else {
        res.status(411).json({
            msg: "invalid credintials"
        });
    }
});
app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    await ContentModel.create({
        link, type,
        //@ts-ignore
        userId: req.userId,
        tags: []
    });
    res.json({
        msg: "Content added"
    });
});
app.get("/api/v1/getcontent", userMiddleware, async (req, res) => {
    //@ts-ignore
    const UserId = req.userId;
    const content = await ContentModel.find({ userId: UserId }).populate("userId", "username");
    res.json({
        content
    });
});
app.delete("/api/v1/delete", userMiddleware, async (req, res) => {
    const contentid = req.body.contentid;
    await ContentModel.deleteMany({
        contentid,
        //@ts-ignore
        userId: req.userId
    });
    res.json({
        msg: "deleted"
    });
});
app.post("/api/v1/brain/share", (req, res) => {
});
app.get("/api/v1/brain/:shareLink", (req, res) => {
});
app.listen(3000);
//# sourceMappingURL=index.js.map