import express, { Request, Response } from "express";
import cors from "cors";
import authRouter from "./routes/auth";
import postRouter from "./routes/posts";
import { app, port } from "./constants";

app.use(cors());
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});