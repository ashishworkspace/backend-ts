import { NextFunction, Request, Response, Router } from "express";
import { accessControl } from "./access-control";
import bcrypt from "bcrypt"

const router = Router();

router.get(
  "/healthcheck",
  (_req: Request, res: Response, _next: NextFunction) => {
    res.status(200).json({
      status: "ok",
    });
  }
);

router.use("/auth", accessControl);

export { router as authRouter };
