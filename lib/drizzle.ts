import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core"
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless"

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export const userTable = pgTable("users", {
    customer_name: varchar("customer_name", {
        length: 255
    }).notNull(),
    username: varchar("username", {
        length: 255
    }).notNull(),
    email: varchar("email", {
        length: 255
    }).notNull(),
    user_password: varchar("user_password", {
        length: 255
    }).notNull(),
});

export const db = drizzle(pool);