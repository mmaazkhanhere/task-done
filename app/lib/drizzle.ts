import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core"
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless"

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export const userTable = pgTable("users", {
    user_name: varchar("user_name", {
        length: 255
    }).notNull(),
    username: varchar("username", {
        length: 255
    }).notNull().unique(),
    email: varchar("email", {
        length: 255
    }).notNull().unique(),
    user_password: varchar("user_password", {
        length: 255
    }).notNull(),
});

export const taskTable = pgTable("tasks", {
    username: varchar("username", {
        length: 255
    }).notNull(),
    task_added: varchar("task_added", {
        length: 255
    }).notNull(),
    due_date: timestamp("due_date", { mode: 'string' }).notNull()
})


export const completedTaskTable = pgTable("completedtask", {
    username: varchar("username", {
        length: 255
    }).notNull(),
    task_completed: varchar("task_completed", {
        length: 255
    })
});

export const pendingTaskTable = pgTable("pendingtask", {
    username: varchar("username", {
        length: 255
    }).notNull(),
    task_pending: varchar("task_pending", {
        length: 255
    }).notNull(),
    due_date: timestamp("due_date", { mode: 'string' }).notNull()
})

export const db = drizzle(pool);