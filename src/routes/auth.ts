import { app } from "../constants";
import { Request, Response } from "express";
import { signInUser, signOutUser, signUpNewUser } from "../auth/supabase";
import { LoginRequest, SignUpRequest } from "../interfaces";
import { Router } from "express";

const authRouter = Router();

authRouter.get("/", (req: Request, res: Response) => {
  res.send("GET: Auth route");
});
/**
 * @route POST /login
 * @param email
 * @param password
 * @returns user data
 * @description This route is used to login a user
 */
authRouter.post(
  "/signup",
  async (req: Request<{}, {}, SignUpRequest>, res: Response) => {
    const { email, password, name } = req.body;
    try {
      const data = await signUpNewUser(email, password, name);
      res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);
authRouter.post(
  "/signin",
  async (req: Request<{}, {}, LoginRequest>, res: Response) => {
    const { email, password } = req.body;
    try {
      const data = await signInUser(email, password);
      res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);
authRouter.post("/signout", async (req: Request, res: Response) => {
  try {
    const data = await signOutUser();
    res.status(200).json(data);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default authRouter;