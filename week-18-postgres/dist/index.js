import { Client } from 'pg';
const client = new Client("postgresql://postgres:mypassword@localhost:5432/postgres?sslmode=disable");
async function main() {
    await client.connect();
    const response = await client.query("SELECT * FROM users;");
    console.log(response.rows);
}
main();
//# sourceMappingURL=index.js.map