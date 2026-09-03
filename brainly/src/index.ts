import express from "express";
import mongoose  from "mongoose";
import jwt from "jsonwebtoken";
import { UserModel, ContentModel, LinkModel } from "./db.js";
import { JWT_PASSWORD } from "./config.js";
import { userMiddleware } from "./middleware.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors())

app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body. password;

    try{
        await UserModel.create({
            username,
            password
        })
        res.json({
            message: "User signed up"
        })
    }catch(e){
        res.status(411).json({
            message:" User already exists"
        })
    }
    
})

app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body. password;
    const existingUser = await UserModel.findOne({
        username,
        password
    })
    if (existingUser){
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_PASSWORD)

        res.json({token})
    }else{
        res.status(403).json({
            message: "incorrect credentials"
        })
    }

})

app.post("/api/v1/content", userMiddleware, async(req, res)=>{
    const link = req.body.link;
    const type = req.body.type;
    //@ts-ignore
    await ContentModel.create({
        link,
        type,
        title:req.body.title,
        userId: req.userId,
        tags:[]
    })
})

app.get("/api/v1/content", userMiddleware, async(req, res)=>{ 
    const userId = req.userId;
     //@ts-ignore
    const content = await ContentModel.find({
        userId:userId
    }).populate("userId", "username")
    res.json({
        content
    })
})

app.delete("api/v1/content", userMiddleware, async(req, res)=>{
    console.log(req.body);
    const contentId = req.body.contentId;
    //@ts-ignore
    await ContentModel.deleteMany({
        contentId,
        userId: req.userId
    })
    res.json({
        message:"Deleted"
    })
})

app.post("/api/v1/brain/share", userMiddleware, async(req, res)=>{
    const share = req.body.share;
    if (share){
        //@ts-ignore
        const existingLink = await LinkModel.findOne({
            userId: req.userId
        });
        if (existingLink){
            res.json({
                hash: existingLink.hash
            })
            return;
        }
        const hash = random(10);
        await LinkModel.create({
            userId: req.userId,
            hash: hash
            })

            res.json({
                hash
            })
    } else {
        await LinkModel.deleteOne({
            userId: req.userId
        });

        res.json({
            message: "Removed link"
        })
    }
})


 

app.listen(3000);