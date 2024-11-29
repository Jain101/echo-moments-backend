import express, { Express } from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

// environment variables
export const port = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";
const isDev = NODE_ENV === "development";
const isProd = NODE_ENV === "production";
const isTest = NODE_ENV === "test";
const databaseURL = process.env.DATABASE_URL;
const databaseKey = process.env.DATABASE_KEY;

// Express app
export const app: Express = express();
// Supabase client
export const supabase = createClient(
  databaseURL as string,
  databaseKey as string
);
