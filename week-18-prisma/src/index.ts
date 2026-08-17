import "dotenv/config";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env["DATABASE_URL"] });
const client = new PrismaClient({ adapter });

async function createUser() {
  await  client.user.create({
    data:{
        username:"yun",
        password:"123",
        age:22,
        city:"sea"
    }
})
}
createUser();
