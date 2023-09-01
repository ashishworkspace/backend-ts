import { NextFunction, Request, Response, Router } from "express";
import { accessControl } from "./access-control";
import { user } from "./user";
import { validateRoutes } from "@middlewares/validateRoutes";

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
router.use("/api/user", validateRoutes, user);

export { router as authRouter };
