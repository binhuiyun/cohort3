import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env["DATABASE_URL"] });
const client = new PrismaClient({ adapter });

async function createDummyUsers() {
   await client.user.create({
        data: {
            username: "clair",
            age: 21,
            password: "123123",
            city: "BJ",
            todos: {
                create: {
                    description: "Go to gym",
                    title: "Gym",
                    done: false
                }
            }
        }
    })
}

createDummyUsers()

//npx prisma db seed