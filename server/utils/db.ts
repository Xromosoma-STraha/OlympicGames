// server/utils/db.ts
import { Client } from 'pg';

let client: Client | null = null;

async function connectToDatabase(): Promise<Client> {
    if (client) return client;

    client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    });

    try {
        await client.connect();
        console.log('Connected to database!');
        return client;
    } catch (error) {
        console.error('Error connecting to database:', error);
        throw error;
    }
}

async function disconnectFromDatabase(): Promise<void> {
    if (client) {
        try {
            await client.end();
            console.log('Disconnected from database!');
        } catch (error) {
            console.error('Error disconnecting from database:', error);
        } finally {
            client = null;
        }
    }
}

export { connectToDatabase, disconnectFromDatabase };