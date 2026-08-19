import {createClient} from "redis";

async function main() {
    const websites:{url: string, id: string}[] = [
        {url: "https://www.google.com", id: "1"},
        {url: "https://www.facebook.com", id: "2"},
        {url: "https://www.twitter.com", id: "3"},
        {url: "https://www.instagram.com", id: "4"},
        {url: "https://www.youtube.com", id: "5"},
    ]
    const client = await createClient()
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

const res = await client.xAdd('betteruptime:website', '*', websites.map(website => ({
    url: website.url,
    id: website.id
})))
console.log(res);
client.destroy()
}

main()

