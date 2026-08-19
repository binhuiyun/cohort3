import { createClient } from "redis";

const client = await createClient()
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

type WebsiteEvent = {url: string, id: string}

const STREAM_NAME = "betteruptime:website";

async function xAdd({url, id}:WebsiteEvent) {
    await client.xAdd(
        STREAM_NAME, '*',{
            url,
            id
        }
    );
    
}

export async function xAddBulk(websites:WebsiteEvent[]) {
    for (const website of websites){
        await xAdd(website)
    }
}