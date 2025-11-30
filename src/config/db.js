import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from "postgres";
import * as schema from '../db/schema.js';

const DB_URL = process.env.DB_URL;

if (!DB_URL) throw new Error('DATABASE URL env is required!')

const clinet = postgres(DB_URL, { max:1 });

const db = drizzle(clinet, {
    logger: true,
    schema: schema
});

export default db;