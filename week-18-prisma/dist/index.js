import "dotenv/config";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import express from "express";
const app = express();
const adapter = new PrismaPg({ connectionString: process.env["DATABASE_URL"] });
const client = new PrismaClient({ adapter });
app.get("/users", async (req, res) => {
    const users = await client.user.findMany();
    res.json({
        users
    });
});
app.get("/todos/:id", async (req, res) => {
    const id = req.params.id;
    const user = await client.user.findFirst({
        where: {
            id: parseInt(id)
        },
        select: {
            todos: true,
            username: true,
            password: true,
        }
    });
    res.json({
        user
    });
});
async function getUser() {
    const user = await client.user.findFirst({
        where: {
            id: 1
        },
        include: {
            todos: true
        }
    });
    console.log(user);
}
app.listen(3000);
getUser();
//# sourceMappingURL=index.js.map