import express from "express";
import prisma from "store/client";

const app = express();
app.use(express.json());

app.post("/website", async (req, res) => {
  if (!req.body.url) {
    return res.status(411).json({ error: "URL is required" });
  }
  const website = await prisma.website.create({
    data: {
      url: req.body.url,
      timeAdded: new Date(),
    },
  });

  res.json({id:website.id});
});

app.get("/status/:websiteId", (req, res) => {


})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});