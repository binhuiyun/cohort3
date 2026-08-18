import express from "express";
import prisma from "store/client";

const app = express();
app.use(express.json());

app.post("/website", async (req, res) => {
  const website = await prisma.website.create({
    data: {
      url: req.body.url,
      timeAdded: new Date(),
    },
  });

  res.json({ id: website.id });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
