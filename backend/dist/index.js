import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ContentModel, UserModel, LinkModel } from "./db.js";
import { JWT_PASSWORD } from "./config.js";
import { userMiddleware } from "./middleware.js";
import { random } from "./utils.js";
import cors from "cors";
import { FormatDate } from "./dates.js";
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
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
    const title = req.body.title;
    try {
        console.log(req.body);
        const newContent = await ContentModel.create({
            link, type,
            title,
            //@ts-ignore
            userId: req.userId,
        });
        res.json({
            content: newContent,
            msg: "created succesfully"
        });
    }
    catch (err) {
        console.error("Error while adding content:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
});
app.get("/api/v1/getcontent", userMiddleware, async (req, res) => {
    //@ts-ignore
    const UserId = req.userId;
    const filter = req.query.filter; // e.g. "youtube"
    // Build query
    let query = { userId: UserId };
    if (filter) {
        query.type = filter; // add filter if present
    }
    const content = await ContentModel.find({ userId: UserId }).populate("userId", "username")
        .sort({ createdAt: -1 }).lean();
    const data = content.map(d => ({ ...d,
        createdAtFormatted: d.createdAt ? FormatDate(new Date(d.createdAt)) : ""
    }));
    res.json(data);
});
app.delete("/api/v1/delete", userMiddleware, async (req, res) => {
    const { _id } = req.body;
    await ContentModel.deleteOne({
        _id,
        //@ts-ignore
        userId: req.userId
    });
    res.json({
        msg: "deleted"
    });
});
app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const { share } = req.body;
    if (share) {
        const existingLink = await LinkModel.findOne({
            //@ts-ignore
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = random(10);
        await LinkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash
        });
        res.json({
            msg: "/share/" + hash
        });
    }
    else {
        await LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        });
        //we can share or dont share
        res.json({
            message: "Remove  link"
        });
    }
});
app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
    const link = await LinkModel.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            msg: "sorry incorrect input"
        });
        return;
    }
    const contents = await ContentModel.find({
        userId: link.userId
    });
    const user = await UserModel.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(411).json({
            msg: "user not found,error should ideally not happen"
        });
        return;
    }
    res.json({
        username: user.username,
        contents: contents
    });
});
app.listen(3000);
//# sourceMappingURL=index.js.map