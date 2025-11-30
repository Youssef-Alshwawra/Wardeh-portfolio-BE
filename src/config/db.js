import 'dotenv/config';
import postgres from "postgres";

const DB_URL = process.env.DB_URL;

if (!DB_URL) throw new Error('DATABASE URL env is required!')

const clinet = postgres(DB_URL, { max:1 });
