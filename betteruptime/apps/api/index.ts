import "dotenv/config";
import express from "express";
import {prismaClient} from "store/client";
import { AuthInput } from "./types";
import jwt from "jsonwebtoken";
import {authMiddleware} from "./middleware";

const app = express();
app.use(express.json());

app.post("/website", authMiddleware, async (req, res) => {
  if (!req.body.url) {
    return res.status(411).json({ error: "URL is required" });
  }
  const website = await prismaClient.website.create({
    data: {
      url: req.body.url,
      time_added: new Date(),
      user_id: req.userId!
    },
  });

  res.json({id:website.id});
});

app.get("/status/:websiteId", authMiddleware, async (req, res) => {
  let website = await prismaClient.website.findFirst({
    where: { 
      id: req.params.websiteId,
      user_id: req.userId,
    },
    include:{
      ticks:{
        orderBy:[{
          createdAt: 'desc',
        }],
        take: 1
      }
    }
  });
  if (!website){
    return res.status(404).json({ error: "Website not found" });
  }
  if (website.user_id !== req.userId){
    return res.status(403).json({ error: "Unauthorized" });
  }

})
app.post("/user/signup", async (req, res) => {
  const data = AuthInput.safeParse(req.body);
  if (!data.success){
    console.log(data.error);
    return res.status(403).json({ error: data.error.message });
  }
  try{
    let user = await prismaClient.user.create({
    data: {
      username: data.data.username,
      password: data.data.password,
    },
  });
  res.json({id:user.id});
  } catch (error) {
    return res.status(403).json({ error: "Username already exists" });
  }
});

app.post("/user/signin", async (req, res) => {
  const data = AuthInput.safeParse(req.body);
  if (!data.success){
    return res.status(403).json({ error: data.error.message });
  }
  let user = await prismaClient.user.findFirst({
    where: { username: data.data.username },
  });

  if (user?.password !== data.data.password){
    return res.status(403).json({ error: "Invalid password" });
  }
   let token = jwt.sign({id:user.id}, process.env.JWT_SECRET!);
   res.json({token});
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});