import { NextFunction, Request, Response, Router } from "express";

const router = Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => {});

export { router as login };
