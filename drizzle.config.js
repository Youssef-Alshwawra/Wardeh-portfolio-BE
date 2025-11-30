import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const URL = process.env.DATABASE_URL;

if(!URL) {
    throw new Error('DATABASE URL env is required!');
}

export default defineConfig({
    schema: './src/db/schema.js',
    out: './drizzle',
    dialect: 'postgresql',
    verbose: true,
    strict: true,
    dbCredentials: {
        url: URL
    }
});